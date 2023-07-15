import './FilterCheckbox.css'

const FilterCheckbox = ({ onFilter, isShortMovies }) =>{
    return(
        <div className={'filter'}> {/*TODO мб изменить на форму*/}
            <span className='filter__text'>Короткометражки</span>
            <input className='filter__checkbox' type='checkbox' onChange={onFilter} checked={isShortMovies}></input>
        </div>
    )
}

export default FilterCheckbox;