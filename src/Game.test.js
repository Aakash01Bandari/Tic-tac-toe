import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Game />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders Game component', () => {
    const component = shallow(<Game />);
    expect(component).toHaveLength(1);
});
it('renders Game div', () => {
    const component = shallow(<Game />);
    expect(component.find('.game')).toHaveLength(1);
});