import React from 'react'
import { Button, Col, Form, InputGroup } from 'react-bootstrap'
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { filter, setBrand, setCate, setSearch } from '../../features/productsSlice';

const Search = () => {
    const { cate, brand, search } = useSelector(state => state.productsSlice);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setSearch(e.target.value));
        if (!e.target.value) {
            dispatch(setBrand('All'));
            dispatch(setCate('All'));
            dispatch(filter({ cate: 'All', brand: 'All', search: '' }));
        }
    }

    const handleSearch = () => {
        if (!search) return;
        dispatch(setBrand('All'));
        dispatch(setCate('All'));
        dispatch(filter({ cate, brand, search }));
    }

    const handleKeyboard = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    }




    return (
        <Col md={3}>
            <Form>
                <InputGroup size='sm'>
                    <Form.Control value={search} onChange={handleChange} onKeyDown={handleKeyboard}
                        className='px-1 px-sm-3 py-1 shadow-none'
                        placeholder="Search..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        type='search'
                    />
                    <Button onClick={handleSearch} variant="primary px-1 px-sm-3" id="button-addon2">
                        <BiSearch className=' fs-4' />
                    </Button>
                </InputGroup>
            </Form>
        </Col>
    )
}

export default Search