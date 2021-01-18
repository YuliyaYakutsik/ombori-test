import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import Preloader from '../Preloader';
import Users from '../Users';
import { actions, getSelector } from '../../redux/slices';
import './index.css';

const initialLoadingStateDelay = 3000;

const App = ({
  fetchUsers,
  loadMoreUsers,
  usersAddingReset,
}) => {
  const [isInitialLoadingState, setInitialLoadingState] = useState(true);

  const currentPage = useSelector(getSelector('currentPage'));
  const totalPagesCount = useSelector(getSelector('totalPagesCount'));
  const hasNextPage = currentPage < totalPagesCount;
  const users = useSelector(getSelector('users'));
  const usersAddingState = useSelector(getSelector('usersAddingState'));
  const usersFetchingState = useSelector(getSelector('usersFetchingState'));

  const appIsPrepared = !isInitialLoadingState
    && (usersFetchingState === 'finished' || usersFetchingState === 'failed');

  const loadMore = () => {
    if (!hasNextPage) return;

    if (usersAddingState === 'requested' || usersAddingState === 'failed') return;

    loadMoreUsers(currentPage + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      setInitialLoadingState(false);
    }, initialLoadingStateDelay);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <section className="App">
      <div className="App__wrapper">
        {!appIsPrepared && (
          <div className="App__preloader">
            <Preloader />
          </div>
        )}

        {appIsPrepared && (
          <div className="App__content">
            {usersFetchingState === 'finished' && (
              <>
                <div className="App__users">
                  <InfiniteScroll
                    loadMore={loadMore}
                    hasMore={hasNextPage}
                    pageStart={1}
                    initialLoad={false}
                    useWindow
                  >
                    <Users list={users} />
                  </InfiniteScroll>
                </div>

                {usersAddingState === 'requested' && (
                  <div className="App__smallLoader">
                    <Preloader isSmall />
                  </div>
                )}

                {(hasNextPage && usersAddingState !== 'requested' && usersAddingState !== 'failed') && (
                  <div className="App__loadMoreInfo">
                    <div className="App__loadMoreInfo__arrow" />
                    <div className="App__loadMoreInfo__text">Scroll down to load more</div>
                  </div>
                )}

                {usersAddingState === 'failed' && (
                  <div className="App__warning">
                    Something went wrong during loading the users.
                    <br />
                    <button
                      type="button"
                      onClick={() => {
                        usersAddingReset();
                        loadMore();
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}

                {!hasNextPage && (
                  <div className="App__info">
                    Congrats! All the users were loaded.
                  </div>
                )}

              </>
            )}
            {usersFetchingState === 'failed' && (
              <div className="App__error">
                We are sorry. Some error ocurred.
                <br />
                Please, try again later.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

App.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  loadMoreUsers: PropTypes.func.isRequired,
  usersAddingReset: PropTypes.func.isRequired,
};

export default connect(
  null,
  { ...actions },
)(App);
