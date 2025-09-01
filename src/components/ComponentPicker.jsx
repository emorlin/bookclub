import BookList from "./BookList";

const ComponentPicker = ({ currentLocation }) => {
    switch (currentLocation) {
        case currentLocation.home:
            return <BookList></BookList>;
        case currentLocation.book:
            return <div>Book component placeholder</div>;

        default:
            return <BookList></BookList>;
    }
};

export default ComponentPicker;
