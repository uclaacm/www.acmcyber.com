import { useEffect, useState } from "react";

import styles from "@/styles/Events.module.scss";
import CyberSeo from "@/components/CyberSeo";
import AllEvents, { CyaneaEvent } from "@/data/events";
import { isSameWeek, formatEventDateAndTime } from "@/utils/time";

type EventCB = (event: CyaneaEvent) => void;

const Event = (showPopup: EventCB) => (event: CyaneaEvent, i: number) => {
  const [date, time] = formatEventDateAndTime(event);
  return (
    <div
      className={styles["event-card"]}
      key={i}
      onClick={() => showPopup(event)}
    >
      <span className={styles["type"]}>{event.type}</span>
      <img
        src={event.banner ?? "/images/cyber-motif-applied.png"}
        alt="Event Banner Image"
      />
      <div className={styles["details"]}>
        <h3>{event.title}</h3>
        <div className={styles["date"]}>{date}</div>
        <div className={styles["time"]}>{time}</div>
        <div className={styles["location"]}>{event.location}</div>
      </div>
    </div>
  );
};

type EventPopupProps = {
  event: CyaneaEvent;
  close: () => void;
};

const EventPopup = ({ close, event }: EventPopupProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [date, time] = formatEventDateAndTime(event);
  return (
    <div
      className={`${styles["popup-container"]} ${
        mounted ? styles["mounted"] : null
      }`}
      onClick={close}
    >
      <div className={styles["popup"]}>
        <div className={styles["top-bar"]}>
          <div className={styles["x-button"]} onClick={close} />
        </div>
        <img
          src={event.banner ?? "/images/cyber-motif-applied.png"}
          alt="Event Banner Image"
          className={styles["graphic"]}
        />
        <div className={styles["content"]}>
          <h3>{event.title}</h3>
          <div className={styles["date"]}>{date}</div>
          <div className={styles["time"]}>{time}</div>
          <div className={styles["location"]}>{event.location}</div>
          <div className={styles["description"]}>{event.description}</div>
        </div>
      </div>
    </div>
  );
};

export default function Events() {
  // when page loads, read from data/events.yml
  // parse all of the events into a list of objects [{event object}, ...]
  // display all of the events in the list (hint: use the map() function)

  const [popup, setPopup] = useState<CyaneaEvent | null>(null);
  const [today, setToday] = useState(new Date());

  // reload "today" because page may be accessed at a date later than
  // the date nextjs pre-renders this page
  useEffect(() => setToday(new Date()), []);

  const thisWeek = AllEvents.filter((e) =>
    isSameWeek(new Date(e.start), today)
  );
  const upcomingEvents = AllEvents.filter(
    (e) => e.start > today.valueOf() && !isSameWeek(new Date(e.start), today)
  );

  return (
    <>
      <CyberSeo
        title="Events"
        description="Some of the upcoming events for ACM Cyber at UCLA!"
      />
      <div className="page">
        {popup !== null && (
          <EventPopup event={popup} close={() => setPopup(null)} />
        )}
        <div className={styles["home"]}>
          <h1>Events</h1>

          {/* This Week section */}
          <div className={styles["this-week"]}>
            <h2>This Week</h2>
            <div className={styles["events"]}>
              {thisWeek.length === 0
                ? "No events this week. Come back later!"
                : thisWeek.map(Event(setPopup))}
            </div>
          </div>

          {/* Upcoming section */}
          <div className={styles["upcoming"]}>
            <h2>Upcoming</h2>
            <div className={styles["events"]}>
              {upcomingEvents.length === 0
                ? "No upcoming events currently scheduled. Come back later!"
                : upcomingEvents.map(Event(setPopup))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
