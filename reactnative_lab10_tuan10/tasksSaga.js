import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  fetchTasksRequest, 
  fetchTasksSuccess, 
  fetchTasksFailure, 
  addTaskRequest, 
  addTaskSuccess, 
  addTaskFailure, 
  deleteTaskRequest, 
  deleteTaskSuccess, 
  deleteTaskFailure 
} from './tasksSlice';

function* fetchTasksSaga() {
  try {
    const response = yield call(fetch, 'https://66f606b5436827ced975b8c7.mockapi.io/bai7');
    const data = yield response.json();
    yield put(fetchTasksSuccess(data));
  } catch (error) {
    yield put(fetchTasksFailure(error.toString()));
  }
}

function* addTaskSaga(action) {
  try {
    const response = yield call(fetch, 'https://66f606b5436827ced975b8c7.mockapi.io/bai7', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    const data = yield response.json();
    yield put(addTaskSuccess(data));
  } catch (error) {
    yield put(addTaskFailure(error.toString()));
  }
}

function* deleteTaskSaga(action) {
  try {
    yield call(fetch, `https://66f606b5436827ced975b8c7.mockapi.io/bai7/${action.payload}`, {
      method: 'DELETE',
    });
    yield put(deleteTaskSuccess(action.payload)); // Chỉ cập nhật Redux store
  } catch (error) {
    yield put(deleteTaskFailure(error.toString()));
  }
}



export default function* tasksSaga() {
  yield takeEvery(fetchTasksRequest.type, fetchTasksSaga);
  yield takeEvery(addTaskRequest.type, addTaskSaga);
  yield takeEvery(deleteTaskRequest.type, deleteTaskSaga);
}
