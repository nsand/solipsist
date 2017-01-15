import React from 'react';
import { mount, shallow } from 'enzyme';
import Solipsist from '../Solipsist';

describe('Solipsist', () => {
	let div;
	beforeEach(() => {
		div = document.createElement('div');
		document.body.appendChild(div);
	});
	afterEach(() => {
		document.body.removeChild(div);
	});

	it('should wrap the children in a container', () => {
		const wrapper = shallow(<Solipsist onClick={() => {}}><ul className="sample"><li>Test</li></ul></Solipsist>);
		const list = wrapper.find('.sample');
		expect(wrapper.at(0).type()).toBe('div');
		expect(list.length).toBe(1);
	});

	it('should invoke the callback when clicked outside of the component', () => {
		const cb = jest.fn();
		const wrapper = mount(
			<div>
				<Solipsist onClick={cb}>
					<ul><li>Test</li></ul>
				</Solipsist>
			</div>
		, { attachTo: div });
		document.dispatchEvent(new MouseEvent('click', {bubbles: true}));
		expect(cb).toHaveBeenCalled();
		wrapper.detach();
	});

	it('should not invoke the callback when clicking inside the component', () => {
		const cb = jest.fn();
		const wrapper = mount(
			<div>
				<h1 className="heading">Heading</h1>
				<Solipsist onClick={cb}>
					<ul className="list"><li>Test</li></ul>
				</Solipsist>
			</div>
		, { attachTo: div });
		document.querySelector('.list').dispatchEvent(new MouseEvent('click', {bubbles: true}));
		expect(cb).toHaveBeenCalledTimes(0);
		wrapper.detach();
	});
});
