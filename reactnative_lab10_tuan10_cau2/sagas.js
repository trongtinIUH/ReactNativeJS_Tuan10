import { takeEvery, call, put } from 'redux-saga/effects';
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
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

export default function* rootSaga() {
  yield takeEvery(fetchTasksRequest.type, fetchTasksSaga);
  yield takeEvery(addTaskRequest.type, addTaskSaga);
}
