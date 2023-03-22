import { useState } from 'react';
import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroCreated } from '../heroesList/heroesSlice';

const HeroesAddForm = () => {
  // state for the contol of form
  const [heroName, setHeroName] = useState(''),
        [heroDescr, setHeroDescr] = useState(''),
        [heroElement, setHeroElement] = useState('');

  const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const {request} = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // id generation thru uuid library
    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescr,
      element: heroElement
    }

    // sending the request at JSON format | if request is successfull - add the hero to the store
    request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
      .then(res => console.log(res, 'The request is fine'))
      .then(dispatch(heroCreated(newHero)))
      .catch(err => console.log(err))
    
      // the form cleaner
      setHeroName('');
      setHeroDescr('');
      setHeroElement('');
  }

  const renderFilters = (filters, status) => {
    if (status === 'loading') {
      return <option>Elements Loading</option>
    } else if (status === 'error') {
      return <option>Loading Error</option>
    }

    // if there are filters, render it
    if (filters && filters.length > 0) {
      return filters.map(({name, label}) => {
        // one of the filters is no needded
        // eslint-disable-next-line
        if (name === 'all') return;

        return <option key={name} value={name}>{label}</option>
      })
    }
  }
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New hero name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What is my name?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
                    
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What can I do?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose the hero element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >I master the element ...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;