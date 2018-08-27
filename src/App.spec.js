import React from 'react';
import axios from 'axios';
import App from './App';

describe('App Component', () => {
  const result = [3, 5, 9];
  const promise = Promise.resolve(result);

  it('renders the SearchList wrapper with list elements', () => {
     const wrapper = shallow(<SearchList items={['a', 'b']} />);
     expect(wrapper.find('li')).to.have.length(2);
  });

  it('passes all props to SearchList wrapper', () => {
    const wrapper = shallow(<App />);
    let searchListWrapper = wrapper.find(SearchList);

    expect(searchListWrapper.props().counter).to.equal(0);

    wrapper.setState({ counter: -1 });

    searchListWrapper = wrapper.find(SearchList);
    expect(searchListWrapper.props().counter).to.equal(-1);
  });

  it('calls componentDidUpdate', () => {
    sinon.spy(App.prototype, 'componentDidUpdate');

    const wrapper = mount(<App />);
    expect(App.prototype.componentDidUpdate.calledOnce).to.equal(true);
  });

  // Test asynchronous behavior by checking that all promises are resolved.
  before(() => {
    sinon.stub(axios, 'get').withArgs('http://www.reddit.com/r/reactjs.json').returns(promise);
  });

  after(() => {
    axios.get.restore();
  });

  it('fetches async counters', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state().asyncCounters).to.equal(null);

    promise.then(() => {
      expect(wrapper.state().asyncCounters).to.equal(result);
    });
  });
});
