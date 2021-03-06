import produce from 'immer';

const initialState = {
  places: [],
  imagePaths: [],
  placeDetail: null,

  // load places
  loadPlaceLoading: false,
  loadPlaceDone: false,
  loadPlaceError: null,

  // categorized Place
  categorizedPlaceLoading: false,
  categorizedPlaceDone: false,
  categorizedPlaceError: null,

  // upload Place
  uploadPlaceLoading: false,
  uploadPlaceDone: false,
  uploadPlaceError: null,

  // upload Image
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,

  // search address
  searchAddressLoading: false,
  searchAddressDone: false,
  searchAddressError: null,
  placeAddresses: [],

  // wish place
  wishPlaceLoading: false,
  wishPlaceDone: false,
  wishPlaceError: null,

  // like Place
  likePlaceLoading: false,
  likePlaceDone: false,
  likePlaceError: null,
  
  // direction API
  searchDirectionLoading: false,
  searchDirectionDone: false,
  searchDirectionError: null,
  origin: {
    name: null,
    lat: 0,
    lng: 0,
  },
  destination: {
    name: null,
    lat: 0,
    lng: 0,
  },
  directionResult: {
    resultCode: null,
    resultMessage: null,
    paths: [],
    distance: null,
    duration: null,
  },
}

export const LOAD_PLACES_REQUEST = 'LOAD_PLACES_REQUEST';
export const LOAD_PLACES_SUCCESS = 'LOAD_PLACES_SUCCESS';
export const LOAD_PLACES_FAILURE = 'LOAD_PLACES_FAILURE';

export const LOAD_CATEGORIZED_PLACES_REQUEST = 'LOAD_CATEGORIZED_PLACES_REQUEST';
export const LOAD_CATEGORIZED_PLACES_SUCCESS = 'LOAD_CATEGORIZED_PLACES_SUCCESS';
export const LOAD_CATEGORIZED_PLACES_FAILURE = 'LOAD_CATEGORIZED_PLACES_FAILURE';

export const LOAD_PLACE_REQUEST = 'LOAD_PLACE_REQUEST';
export const LOAD_PLACE_SUCCESS = 'LOAD_PLACE_SUCCESS';
export const LOAD_PLACE_FAILURE = 'LOAD_PLACE_FAILURE';

export const UPLOAD_PLACE_REQUEST = 'UPLOAD_PLACE_REQUEST';
export const UPLOAD_PLACE_SUCCESS = 'UPLOAD_PLACE_SUCCESS';
export const UPLOAD_PLACE_FAILURE = 'UPLOAD_PLACE_FAILURE';
export const UPLOAD_PLACE_DONE = 'UPLOAD_PLACE_DONE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const SEARCH_DIRECTION_REQUEST = 'SEARCH_DIRECTION_REQUEST';
export const SEARCH_DIRECTION_SUCCESS = 'SEARCH_DIRECTION_SUCCESS';
export const SEARCH_DIRECTION_FAILURE = 'SEARCH_DIRECTION_FAILURE';

export const SEARCH_ADDRESS_REQUEST = 'SEARCH_ADDRESS_REQUEST';
export const SEARCH_ADDRESS_SUCCESS = 'SEARCH_ADDRESS_SUCCESS';
export const SEARCH_ADDRESS_FAILURE = 'SEARCH_ADDRESS_FAILURE';

export const WISH_PLACE_REQUEST = 'WISH_PLACE_REQUEST';
export const WISH_PLACE_SUCCESS = 'WISH_PLACE_SUCCESS';
export const WISH_PLACE_FAILURE = 'WISH_PLACE_FAILURE';

export const UNWISH_PLACE_REQUEST = 'UNWISH_PLACE_REQUEST';
export const UNWISH_PLACE_SUCCESS = 'UNWISH_PLACE_SUCCESS';
export const UNWISH_PLACE_FAILURE = 'UNWISH_PLACE_FAILURE';

export const LIKE_PLACE_REQUEST = 'LIKE_PLACE_REQUEST';
export const LIKE_PLACE_SUCCESS = 'LIKE_PLACE_SUCCESS';
export const LIKE_PLACE_FAILURE = 'LIKE_PLACE_FAILURE';

export const UNLIKE_PLACE_REQUEST = 'UNLIKE_PLACE_REQUEST';
export const UNLIKE_PLACE_SUCCESS = 'UNLIKE_PLACE_SUCCESS';
export const UNLIKE_PLACE_FAILURE = 'UNLIKE_PLACE_FAILURE';

export const SET_LIKE_ERROR_NULL = 'SET_LIKE_ERROR_NULL';
export const SET_WISH_ERROR_NULL = 'SET_WISH_ERROR_NULL';

export const SET_ADDRESS_FOR_DIRECTION = 'SET_ADDRESS_FOR_DIRECTION';
export const CLEAR_PLACE_ADDRESS_RESULT = 'CLEAR_PLACE_ADDRESS_RESULT';


const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_PLACES_REQUEST: {
        draft.loadPlaceLoading = true;
        draft.loadPlaceDone = false;
        draft.places = [];
        draft.placeAddresses = [];
        draft.imagePaths = [];
        break;
      }
      case LOAD_PLACES_SUCCESS: {
        draft.loadPlaceLoading = false;
        draft.loadPlaceDone = true;
        draft.places = draft.places.concat(action.data);
        break;
      }
      case LOAD_PLACES_FAILURE: {
        draft.loadPlaceLoading = false;
        draft.loadPlaceDone = false;
        draft.loadPlaceError = action.error;
        break;
      }
      case LOAD_CATEGORIZED_PLACES_REQUEST: {
        draft.categorizedPlaceLoading = true;
        draft.categorizedPlaceDone = false;
        draft.places = [];
        draft.placeAddresses = [];
        draft.imagePaths = [];
        break;
      }
      case LOAD_CATEGORIZED_PLACES_SUCCESS: {
        draft.categorizedPlaceLoading = false;
        draft.categorizedPlaceDone = true;
        draft.places = action.data;
        break;
      }
      case LOAD_CATEGORIZED_PLACES_FAILURE: {
        draft.categorizedPlaceLoading = false;
        draft.categorizedPlaceDone = false;
        draft.categorizedPlaceError = action.error;
        break;
      }
      case LOAD_PLACE_REQUEST: {
        draft.loadPlaceLoading = true;
        draft.loadPlaceDone = false;
        draft.placeDetail = null;
        break;
      }
      case LOAD_PLACE_SUCCESS: {
        draft.loadPlaceLoading = false;
        draft.loadPlaceDone = true;
        draft.placeDetail = action.data;
        break;
      }
      case LOAD_PLACE_FAILURE: {
        draft.loadPlaceLoading = false;
        draft.loadPlaceDone = false;
        draft.loadPlaceError = action.error;
        break;
      }
      case UPLOAD_PLACE_REQUEST: {
        draft.uploadPlaceLoading = true;
        draft.uploadPlaceDone = false;
        break;
      }
      case UPLOAD_PLACE_SUCCESS: {
        draft.uploadPlaceLoading = false;
        draft.uploadPlaceDone = true;
        draft.places.concat(action.data);
        break;
      }
      case UPLOAD_PLACE_FAILURE: {
        draft.uploadPlaceLoading = false;
        draft.uploadPlaceDone = false;
        draft.uploadPlaceError = action.error;
        break;
      }
      case UPLOAD_PLACE_DONE: {
        draft.imagePaths = [];
        draft.uploadPlaceDone = false;
        break;
      }
      case UPLOAD_IMAGES_REQUEST: {
        draft.uploadImageLoading = true;
        draft.uploadImageDone = false;
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        draft.uploadImageLoading = false;
        draft.uploadImageDone = true;
        action.data.forEach(src => {
          draft.imagePaths.push(src);
        })
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        draft.uploadImageLoading = false;
        draft.uploadImageDone = false;
        draft.uploadImageError = action.error;
        break;
      }
      case SET_ADDRESS_FOR_DIRECTION: {
        if(action.data.type === 'origin') {
          draft.origin.name = action.data.address.place_name;
          draft.origin.lat = action.data.address.lat;
          draft.origin.lng = action.data.address.lng;
        } else {
          draft.destination.name = action.data.address.place_name;
          draft.destination.lat = action.data.address.lat;
          draft.destination.lng = action.data.address.lng;
        }
        draft.placeAddresses = [];
        break;
      }
      case SEARCH_ADDRESS_REQUEST: {
        draft.searchAddressLoading = true;
        draft.searchAddressDone = false;
        draft.searchAddressError = null;
        break;
      }
      case SEARCH_ADDRESS_SUCCESS: {
        draft.searchAddressLoading = false;
        draft.searchAddressDone = true;
        draft.placeAddresses = action.data;
        break;
      }
      case SEARCH_ADDRESS_FAILURE: {
        draft.searchAddressLoading = false;
        draft.searchAddressError = action.error;
        break;
      }
      case SEARCH_DIRECTION_REQUEST: {
        draft.searchDirectionLoading = true;
        draft.searchDirectionDone = false;
        draft.searchDirectionError = null;
        break;
      }
      case SEARCH_DIRECTION_SUCCESS: {
        draft.searchDirectionLoading = false;
        draft.searchDirectionDone = true;
        draft.directionResult.resultCode = action.data.code;
        draft.directionResult.resultMessage = action.data.message;
        draft.directionResult.paths = action.data.route.traoptimal[0].path;
        draft.directionResult.duration = action.data.route.traoptimal[0].summary.duration;
        draft.directionResult.distance = action.data.route.traoptimal[0].summary.distance;
        break;
      }
      case SEARCH_DIRECTION_FAILURE: {
        draft.searchDirectionLoading = false;
        draft.searchDirectionError = action.error;
        break;
      }
      case WISH_PLACE_REQUEST: {
        draft.wishPlaceLoading = true;
        draft.wishPlaceDone = false;
        draft.wishPlaceError = null;
        break;
      }
      case WISH_PLACE_SUCCESS: {
        draft.wishPlaceLoading = false;
        draft.wishPlaceDone = true;
        draft.placeDetail.Wishers.push({ id: action.data });
        break;
      }
      case WISH_PLACE_FAILURE: {
        draft.wishPlaceLoading = false;
        draft.wishPlaceError = action.error;
        break;
      }
      case UNWISH_PLACE_REQUEST: {
        draft.wishPlaceLoading = true;
        draft.wishPlaceDone = false;
        draft.wishPlaceError = null;
        break;
      }
      case UNWISH_PLACE_SUCCESS: {
        draft.wishPlaceLoading = false;
        draft.wishPlaceDone = true;
        draft.placeDetail.Wishers = draft.placeDetail.Wishers.filter(v => v.id !== action.data);
        break;
      }
      case UNWISH_PLACE_FAILURE: {
        draft.wishPlaceLoading = false;
        draft.wishPlaceError = action.error;
        break;
      }
      case LIKE_PLACE_REQUEST: {
        draft.likePlaceLoading = true;
        draft.likePlaceDone = false;
        draft.likePlaceError = null;
        break;
      }
      case LIKE_PLACE_SUCCESS: {
        draft.likePlaceLoading = false;
        draft.likePlaceDone = true;
        draft.placeDetail.Likers.push({ id: action.data });
        break;
      }
      case LIKE_PLACE_FAILURE: {
        draft.likePlaceLoading = false;
        draft.likePlaceError = action.error;
        break;
      }
      case UNLIKE_PLACE_REQUEST: {
        draft.likePlaceLoading = true;
        draft.likePlaceDone = false;
        draft.likePlaceError = null;
        break;
      }
      case UNLIKE_PLACE_SUCCESS: {
        draft.likePlaceLoading = false;
        draft.likePlaceDone = true;
        draft.placeDetail.Likers = draft.placeDetail.Likers.filter(v => v.id !== action.data);
        break;
      }
      case UNLIKE_PLACE_FAILURE: {
        draft.likePlaceLoading = false;
        draft.likePlaceError = action.error;
        break;
      }
      case SET_LIKE_ERROR_NULL: {
        draft.likePlaceError = null;
        break;
      }
      case SET_WISH_ERROR_NULL: {
        draft.wishPlaceError = null;
        break;
      }
      case CLEAR_PLACE_ADDRESS_RESULT: {
        draft.placeAddresses = [];
        break;
      }
      default:
        break;
    }
  })
}

export default reducer;