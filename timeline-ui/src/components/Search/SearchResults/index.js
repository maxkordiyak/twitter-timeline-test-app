import React from 'react';

import '../index.css';

export default ({ timeline = [] }) => (
    <div className="timeline">
        <div className="timeline-inner">
            {
                timeline.length == 0 ? (
                    <div className="no-data">No data to display.</div>
                ) : (
                    <ul className="timeline-list">
                        {
                            Array.isArray(timeline) && timeline.length &&
                            timeline.map(
                                el =>
                                    <li key={el.id} className="timeline-list__item">
                                        <div className="timeline-list__content">
                                            <p className="timeline-list__text">
                                                {el.text}
                                            </p>
                                        </div>
                                        <div className="timeline-list__date">
                                    <span className="timeline-list__clock">
                                        {/*// removing a timezone which gets returned from twitter rest api*/}
                                        {
                                            new Date(Date.parse(el.created_at))
                                                .toUTCString()
                                                .split(' ').slice(0, 5).join(' ')
                                        }
                                    </span>
                                        </div>
                                    </li>
                            )
                        }
                    </ul>
                )
            }
        </div>
    </div>
);