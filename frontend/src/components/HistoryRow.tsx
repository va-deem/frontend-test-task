import React from 'react';
import './HistoryRow.css';
import cn from 'clsx';
import dayjs from 'dayjs';
import setColor from '../utils/setColor';

interface HistoryRowProps {
  eventType?: string;
  details?: string;
  code?: string;
  date?: string;
  isHeader?: boolean;
  isGrouped?: boolean;
  isLoading?: boolean;
}

const HistoryRow = ({
  eventType,
  details,
  code,
  date,
  isHeader,
  isGrouped,
  isLoading,
}: HistoryRowProps) => {
  const eventName = (
    <span
      className="history-row__name"
      style={{ backgroundColor: setColor(eventType) }}
    >
      {eventType}
    </span>
  );

  const eventTypeValue = isHeader ? 'Event type' : eventName;
  const detailsValue = isHeader ? 'Details' : details;
  const codeValue = isHeader ? 'Code' : code;
  const dateValue = isHeader ? 'Date' : dayjs(date).format('MMM DD, YYYY');

  const loader = <div className="loading-text">Loading...</div>;

  return (
    <div
      className={cn('history-row', {
        'history-row--header': isHeader,
        'history-row--grouped': isGrouped,
      })}
    >
      <div className="history-row__cell">{isGrouped ? '' : eventTypeValue}</div>
      <div className="history-row__cell">
        {!isLoading ? detailsValue : loader}
      </div>
      <div className="history-row__cell">{!isLoading ? codeValue : loader}</div>
      <div className="history-row__cell">{dateValue}</div>
    </div>
  );
};

export default HistoryRow;
