import { createSlice } from '@reduxjs/toolkit';
import { Services } from '../../../services';

const transactionSlice = createSlice({
  name: 'transactionSlice',
  initialState: {
    transactionByemail: [],
    allTransactions: { data: [], limit: 0, page: 0, total: 0 },
  },
  reducers: {
    addTransactionByEmail: (state, { payload }) => {
      state.transactionByemail = payload;
    },
    addAllTransactions: (state, { payload }) => {
      state.allTransactions = payload;
    },
  },
});

export const { addTransactionByEmail, addAllTransactions } =
  transactionSlice.actions;

export const fetchTransactions = (payload) => (dispatcher) => {
  return Services.fetchTransactionsWithFilter(payload)
    .then((response) => {
      dispatcher(
        addAllTransactions({
          data: response.data.data.body,
          total: response.data.total,
          limit: response.data.limit,
          page: response.data.page,
        })
      );

      return Promise.resolve(response.data.data.body);
    })
    .catch((error) => {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
    });
};

export const fetchTransactionsByEmail = (payload) => (dispatcher) => {
  return Services.fetchTransactionsByEmail(payload)
    .then((response) => {
      dispatcher(addTransactionByEmail(response.data.data.body));
      return Promise.resolve(response.data.data.body);
    })
    .catch((error) => {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
    });
};

export const requeryTransaction = (payload) => dispatcher => {
    return Services.requeryTransaction(payload).then(
        response => {
            return Promise.resolve(response.data.data.body);
        }
    ).catch((error) => {
        if (error.response) {
          return Promise.reject(error.response.data);
        }
      });
}

export const selectTransactions = (state) => state.transactionsReducer;

export default transactionSlice.reducer;
