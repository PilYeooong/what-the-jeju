const axios = require('axios');
const { Place, Image, User, Category, Hashtag } = require('../models');
const { naverConfig, kakaoConfig } = require('../utils/apiHeaders');

exports.addImages = async (req, res, next) => {
  return res.send(req.files.map((f) => f.filename));
};

exports.addPlace = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send('로그인이 필요합니다.');
    }
    const category = await Category.findOne({
      where: { name: req.body.category },
    });
    const exPlace = await Place.findOne({ where: { name: req.body.name } });
    if (exPlace) {
      return res.status(409).send('같은 이름의 장소가 존재합니다.');
    }
    const hashtags = req.body.description.match(/#[^\s]+/g);
    const description = req.body.description.replace(/#[^\s]+/g, '').trim();
    const place = await Place.create({
      CategoryId: category.id,
      name: req.body.name,
      description,
      address: req.body.address,
      UserId: req.user.id,
      lat: req.body.lat,
      lng: req.body.lng,
      fee: 0,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((v) =>
          Hashtag.findOrCreate({ where: { name: v.slice(1).toLowerCase() } })
        )
      );
      await place.addHashtags(result.map((v) => v[0])); // result = [[Hashtag, true], [Hashtag, true]] 형태의 반환 값
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await place.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await place.addImages(image);
      }
    }
    return res.status(201).send(place);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.placeDetail = async (req, res, next) => {
  try {
    const place = await Place.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Image,
        },
        {
          model: User,
          as: 'Wishers',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: Hashtag,
          attributes: ['name'],
        },
      ],
    });
    if(!place) {
      return res.status(404).send('존재하지 않는 장소입니다.');
    }
    return res.status(200).send(place);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.likePlace =  async (req, res, next) => {
  try {
    const place = await Place.findOne({
      where: { id: parseInt(req.params.placeId, 10) },
    });
    if (!place) {
      return res.status(404).send('존재하지 않는 장소입니다.');
    }
    if (!req.user) {
      return res.status(401).send('로그인이 필요합니다.');
    }
    await place.addLikers(req.user.id);
    return res.status(200).json({ placeId: place.id, userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.unLikePlace = async (req, res, next) => {
  try {
    const place = await Place.findOne({
      where: { id: parseInt(req.params.placeId, 10) },
    });
    if (!place) {
      return res.status(404).send('존재하지 않는 장소입니다.');
    }
    if (!req.user) {
      return res.status(401).send('로그인이 필요합니다.');
    }
    await place.removeLikers(req.user.id);
    return res.status(200).json({ placeId: place.id, userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

exports.wishPlace = async (req, res, next) => {
  try {
    const place = await Place.findOne({
      where: { id: parseInt(req.params.placeId, 10) },
      include: [{ model: Image }],
    });
    if (!place) {
      return res.status(404).send('존재하지 않는 장소입니다.');
    }
    if (!req.user) {
      return res.status(401).send('로그인이 필요합니다.');
    }
    await place.addWishers(req.user.id);
    return res.status(200).json({ place, userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.unWishPlace = async (req, res, next) => {
  try {
    const place = await Place.findOne({
      where: { id: parseInt(req.params.placeId, 10) },
    });
    if (!place) {
      return res.status(404).send('존재하지 않는 장소입니다.');
    }
    if (!req.user) {
      return res.status(401).send('로그인이 필요합니다.');
    }
    // const isWished = place.Wishers.find((v) => v.id === req.user.id);
    // if (isWished) {
    await place.removeWishers(req.user.id);
    return res.status(200).json({ placeId: place.id, userId: req.user.id });
    // }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.searchDirections = async (req, res, next) => {
  const { origin, destination, wayPoints } = req.body;
  let wayPointsParams = '';
  for (let i = 0; i < wayPoints.length; i++) {
    if (i === wayPoints.length - 1) {
      wayPointsParams += `${wayPoints[i].lng},${wayPoints[i].lat}`;
    } else {
      wayPointsParams += `${wayPoints[i].lng},${wayPoints[i].lat}|`;
    }
  }
  const startPoint = `${origin.lng},${origin.lat}`;
  const endPoint = `${destination.lng},${destination.lat}`;
  try {
    const result = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${startPoint}&goal=${endPoint}&waypoints=${wayPointsParams}&option=traoptimal`,
      naverConfig
    );
    return res.status(200).send(result.data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.searchPlaceWithAddress = async (req, res, next) => {
  try {
    const result = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        req.params.placeAddress
      )}`,
      kakaoConfig
    );

    const addresses = result.data.documents.map((address, index) => {
      const obj = {};
      obj.idx = index;
      obj.address_name = address.address_name;
      obj.place_name = address.road_address.building_name;
      obj.lng = address.x;
      obj.lat = address.y;
      return obj;
    });
    return res.status(200).send(addresses);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.searchPlaceWithKeyword = async (req, res, next) => {
  try {
    const result = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURI(
        req.params.placeName
      )}`,
      kakaoConfig
    );

    const addresses = result.data.documents.map((address, index) => {
      const obj = {};
      obj.idx = index;
      obj.address_name = address.address_name;
      obj.place_name = address.place_name;
      obj.lng = address.x;
      obj.lat = address.y;
      return obj;
    });

    return res.status(200).send(addresses);
  } catch (err) {
    console.error(err);
    next(err);
  }
}