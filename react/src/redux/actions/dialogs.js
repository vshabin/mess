import { dialogsApi } from 'utils/api';
import socket from 'core/socket';

const Actions = {
  setDialogs: items => ({
    type: 'DIALOGS:SET_ITEMS',
    payload: items,
  }),
  updateReadedStatus: ({ userId, dialogId }) => ({
    type: 'DIALOGS:LAST_MESSAGE_READED_STATUS',
    payload: {
      userId,
      dialogId,
    },
  }),
  setCurrentDialogId: id => dispatch => {
    socket.emit('DIALOGS:JOIN', id);
    dispatch({
      type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
      payload: id,
    });
  },
  fetchDialogs: () => dispatch => {
    dialogsApi.getAll().then(({ data }) => {
      dispatch(Actions.setDialogs(data));
    });
  },
  removeDialogById: id => dispatch => {
    if (window.confirm("Вы действительно хотите удалить диалог?")) {
      dialogsApi
        .removeById(id)
        .then(({ data }) => {
          dispatch({
            type: "DIALOGS:REMOVE_DIALOG",
            payload: id
          });
        })
        .catch(() => {
          dispatch(Actions.setIsLoading(false));
        });
    }
  }
};


export default Actions;
