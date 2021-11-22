import AddToCalendarHOC from "react-add-to-calendar-hoc";
import { event } from "./event";

export default function Main() {
  const ATCDropdown = (args) => (
    <ul className="atc-dropdown">
      {args.children.map((link, i) => (
        <li key={i}>{link}</li>
      ))}
    </ul>
  );

  const ATCWrapper = (args) => (
    <a onClick={args.onClick} className="atc-item" href="/">
      {args.children}
    </a>
  );

  const AddToCalendarDropdown = AddToCalendarHOC(ATCWrapper, ATCDropdown);

  return (
      <AddToCalendarDropdown
        linkProps={{
          className: "atc-dropdown-title"
        }}
        event={event}
      />
  );
}
