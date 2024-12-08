import EventsContents from "~/components/dashboard/EventsContents";
import EventFooter from "~/components/footer/EventFooter";
import Header from "~/components/students/Header";

const Events = () => {
  return (
    <div className="w-full">
      <Header />
      <EventsContents />
      <EventFooter />
    </div>
  );
};

export default Events;
