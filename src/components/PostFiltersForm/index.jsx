import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null
}

function PostFiltersForm(props) {

    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeOutRef = useRef(null);

    function handleSearchTermChange(e) {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        if (!onSubmit) return;

        if(typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            const formValue = { searchTerm: newValue };
            onSubmit(formValue);
        }, 300)
    }

    function handleOnSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </form>
        </>
    );
}

export default PostFiltersForm;