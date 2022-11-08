import React, { useEffect, useState } from 'react';
import './History.css';
import HistoryRow from './HistoryRow';
import dayjs from 'dayjs';
import { clearEvents, fetchEvents } from '../reducers/eventsSlice';

import { useAppDispatch, useAppSelector } from '../hooks/reduxTyped';
import { clearResources, fetchResources } from '../reducers/resourcesSlice';
import displayDetails from '../utils/displayDetails';

const History = () => {
  const events = useAppSelector((state) => state.events);
  const resources = useAppSelector((state) => state.resources);
  const dispatch = useAppDispatch();
  const [visibleRow, setVisibleRow] = useState<number>(0);
  const [rowsLoaded, setRowsLoaded] = useState<number>(0);
  const [loading, setLoading] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchEvents());

    return () => {
      dispatch(clearEvents());
      dispatch(clearResources());
    };
  }, [dispatch]);

  useEffect(() => {
    const nodes = document.querySelectorAll('.bottom');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { target, isIntersecting, boundingClientRect } = entry;
          if (
            target.className.includes('bottom') &&
            isIntersecting &&
            boundingClientRect.y > 0
          ) {
            const el = target as HTMLElement;
            const currentRow = Number(el.dataset.countid);

            setVisibleRow((prevState) => {
              if (currentRow > prevState) {
                return prevState + 1;
              }
              return prevState;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    nodes.forEach((node) => {
      observer.observe(node);
    });

    return () => {
      observer.disconnect();
    };
  }, [events?.data?.length]);

  useEffect(() => {
    const ids = events?.data?.map((event) => `${event.resource}/${event.id}`);
    if (visibleRow > 0 && rowsLoaded === 0) {
      dispatch(fetchResources(ids.slice(0, visibleRow)));
      setLoading([0, visibleRow]);
      setRowsLoaded(visibleRow);
    }
    if (visibleRow > rowsLoaded) {
      dispatch(fetchResources(ids.slice(visibleRow, visibleRow + 15)));
      setLoading([loading[0] || visibleRow, visibleRow + 15]);
      setRowsLoaded(visibleRow + 15);
    }
  }, [visibleRow, rowsLoaded, dispatch, events, loading]);

  if (events?.errors || resources?.errors) {
    return (
      <div className="history__error">
        {events?.errors?.message || resources?.errors?.message}
      </div>
    );
  } else if (events.isLoading) {
    return <div className="loading-text">Loading...</div>;
  } else {
    return (
      <section className="history">
        <HistoryRow isHeader />
        {events?.data?.map((event, idx) => {
          const isGrouped =
            idx > 0 &&
            events?.data[idx - 1].name === event.name &&
            dayjs(events?.data[idx - 1].date).isSame(event.date, 'day');
          const resource = resources?.data?.find(
            (r) => r.id === `${event.resource}/${event.id}`
          );
          const details = displayDetails(resource);
          return (
            <div key={event.id}>
              <HistoryRow
                key={event.id}
                eventType={event.name}
                details={details}
                code={resource?.code || ''}
                date={event.date}
                isGrouped={isGrouped}
                isLoading={
                  idx >= loading[0] && idx <= loading[1] && resources.isLoading
                }
              />
              <div className="bottom" data-countid={idx} />
            </div>
          );
        })}
      </section>
    );
  }
};

export default History;
