import { render, screen } from '@testing-library/react';
import { configure, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import store from '../redux/store'
// import * as data from "../../db.json";
import App from '../App';
import Home from '../components/containers/Home.jsx'
import NavBar from '../components/containers/NavBar.jsx'
import Form from '../components/containers/Form.jsx'
import DogDetail from '../components/renders/DogDetail.jsx'
import Adoption from '../components/containers/Adoption.jsx'
import NotFound from '../components/containers/NotFound.jsx'
import SearchBar from '../components/containers/SearchBar.jsx'
import DogCard from '../components/renders/DogCard.jsx'

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

const routes = ["/", "/home", "/dog/create", "/dogs/:1", "/adoption", "*"];
// const mockStore = configureStore([thunk]);
//   const state = {
//     Dogs: data.dogs,
//     dog: data.dog,
//   };

// const store = mockStore(state);

const componentToUse = (route) => {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

test('El componente "NavBar" se debería renderizar solamente en la ruta "/home"', () => {
    const app = mount(componentToUse(routes[1]));
    expect(app.find(NavBar)).toHaveLength(1);
  });

test('Los componentes "SearchBar", "Home" y "DogCard" se debería renderizar solamente en la ruta "/home"', () => {
  const app = mount(componentToUse(routes[1]));
  expect(app.find(SearchBar)).toHaveLength(1);
  expect(app.find(Home)).toHaveLength(1);
  expect(app.find(DogCard)).toHaveLength(1);
});

test('El componente "DogDetail" se debería renderizar solamente en la ruta "/dog/:id"', () => {
  const app = mount(componentToUse(routes[3]));
  expect(app.find(DogDetail)).toHaveLength(1);
});

test('El componente "Form" se debería renderizar solamente en la ruta "/dogs/create"', () => {
  const app = mount(componentToUse(routes[2]));
  expect(app.find(Form)).toHaveLength(1);
});

test('El componente "Adoption" se debería renderizar solamente en la ruta "/adoption"', () => {
  const app = mount(componentToUse(routes[4]));
  expect(app.find(Adoption)).toHaveLength(1);
});

test('El componente "Not Found" se debería renderizar siempre que otra ruta no sea encontrada', () => {
  const app = mount(componentToUse(routes[5]));
  expect(app.find(NotFound)).toHaveLength(1);
});