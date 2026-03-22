import React, { useEffect, useState } from 'react';
import './Performances.css';
import { useReveal } from '../hooks/useReveal';
 
// Paste your published Google Sheet CSV URL here:
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQU6nKeNLYKtCuMDqk131w0_Mro7mA4xWafFnkeDjjxYYT9wpDEFbnrB7RiK3n7ecvao3E9VSH7qCHM/pub?output=csv';
 
interface PerformanceEvent {
  date: string;
  title: string;
  venue: string;
  location: string;
}
 
interface PerformancesData {
  recitals: PerformanceEvent[];
  lectures: PerformanceEvent[];
}
 
function parseCSV(csv: string): PerformancesData {
  const lines = csv.trim().split('\n');
  const rows = lines.slice(1);
 
  const recitals: PerformanceEvent[] = [];
  const lectures: PerformanceEvent[] = [];
 
  rows.forEach((row) => {
    const cols = row.match(/(".*?"|[^,]+|(?<=,)(?=,)|^(?=,)|(?<=,)$)/g) ?? [];
    const clean = (s?: string) => (s ?? '').replace(/^"|"$/g, '').trim();
 
    const type = clean(cols[0]);
    const event: PerformanceEvent = {
      date: clean(cols[1]),
      title: clean(cols[2]),
      venue: clean(cols[3]),
      location: clean(cols[4]),
    };
 
    if (!event.date) return;
 
    if (type === 'recital') recitals.push(event);
    else if (type === 'lecture') lectures.push(event);
  });
 
  return { recitals, lectures };
}
 
const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};
 
// Extracts a sortable numeric value from date strings like:
// "10 October 2025", "4 July 2025", "29 Aug – 1 Sep 2026"
function dateScore(date: string): number {
  const yearMatch = date.match(/\d{4}/);
  const year = yearMatch ? parseInt(yearMatch[0]) : 0;
 
  const monthMatch = date.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/);
  const month = monthMatch ? MONTHS[monthMatch[0]] : 0;
 
  const dayMatch = date.match(/\d{1,2}/);
  const day = dayMatch ? parseInt(dayMatch[0]) : 0;
 
  return year * 10000 + month * 100 + day;
}
 
function sortDesc(events: PerformanceEvent[]): PerformanceEvent[] {
  return [...events].sort((a, b) => dateScore(b.date) - dateScore(a.date));
}
 
interface EventListProps {
  events: PerformanceEvent[];
}
 
function EventList({ events }: EventListProps): React.JSX.Element {
  return (
    <ul className="performances__list">
      {events.map((e, i) => (
        <li key={i} className="performances__item">
          <span className="performances__date">{e.date}</span>
          <span className="performances__event-title">{e.title}</span>
          <span className="performances__location">
            {[e.venue, e.location].filter(Boolean).join(' - ')}
          </span>
        </li>
      ))}
    </ul>
  );
}
 
export default function Performances(): React.JSX.Element {
  const [data, setData] = useState<PerformancesData>({ recitals: [], lectures: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
 
  const headingRef = useReveal<HTMLHeadingElement>();
 
  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.text();
      })
      .then((csv) => {
        setData(parseCSV(csv));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);
 
  return (
    <section className="performances" id="performances">
      <div className="performances__inner">
        <h2 className="section-title reveal" ref={headingRef}>Recent Performances</h2>
        <div className="underline"/>
 
        {loading && <p className="performances__status">Loading performances...</p>}
        {error && <p className="performances__status">Could not load performances.</p>}
 
        {!loading && !error && (
          <div className="performances__columns">
            <div className="performances__col">
              <h3 className="performances__col-title">Recitals</h3>
              <EventList events={sortDesc(data.recitals)} />
            </div>
            <div className="performances__col">
              <h3 className="performances__col-title">Lecture-Recitals</h3>
              <EventList events={sortDesc(data.lectures)} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}