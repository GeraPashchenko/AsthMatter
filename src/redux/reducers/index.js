import {actionType} from "../actions";

// initial storage state
const initialStore = {
  serverAddress: 'https://localhost:5000',
  user: {},
  language: 'ua',
  attackList: [
    {
      "id": 1017,
      "wasAt": "2020-11-06T19:56:34",
      "patientId": 7,
      "selectedReasons": [
        "dust",
        "dog"
      ]
    },
    {
      "id": 1018,
      "wasAt": "2020-11-06T19:56:34",
      "patientId": 7,
      "selectedReasons": [
        "dust",
        "flowers"
      ]
    }
  ],
  "statistics": {
    "dust": 2,
    "dog": 1,
    "flowers": 1
  }
}

// pure reducer function
export default function reduser(state = initialStore, action) {

  switch (action.type) {

    case (actionType.SET_USER):
      return ({
        ...state,
        user: action.payload.user
      });

    case (actionType.SET_LOCALIZATION):
      return ({
        ...state,
        language: action.payload.language
      });

    case (actionType.SET_ATTACK_LIST):
      return ({
        ...state,
        attackList: action.payload.attackList
      });

    case (actionType.CREATE_ATTACK):
      return ({
        ...state,
        attackList: [
          ...state.attackList,
          {
            id: state.attackList[state.attackList.length - 1] + 1,
            wasAt: action.payload.newAttack.wasAt,
            patientId: action.payload.newAttack.patientId,
            attackRecordAndReasons: action.payload.newAttack.attackRecordAndReasons
          }]
      });

    case (actionType.UPDATE_ATTACK):
      return ({
        ...state,
        attackList: state.attackList.map((element) => {
          if (element.id === action.payload.attackId) {
            element.wasAt = action.payload.updatedAttack.wasAt;
            element.patientId = action.payload.updatedAttack.patientId;
            element.attackRecordAndReasons = action.payload.updatedAttack.attackRecordAndReasons
          }
          return element;
        })
      });

    case (actionType.DELETE_ATTACK):
      return ({
        ...state,
        attackList: state.tracksList[action.payload.list].filter((element) =>
          element.id !== action.payload.attackId)
      });

    // case (actionType.SET_INHALER_ID): 
    //   return ({
    //     ...state,
    //     inhalerId : action.payload.inhalerId
    //   });

    default:
      return state;
  }
}
