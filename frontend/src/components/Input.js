import React from 'react';
import PropTypes from 'prop-types';

const Input = (params) => {
    return (
        <div className='form-group'>
            <input
                type={params.type}
                name={params.name}
                className={`form-control ` + (params.error ? 'is-invalid' : '') + (params.className ? params.className : '')}
                placeholder={params.placeholder}
                value={params.value}
                onChange={params.onChange}
                disabled={params.loading}
                style={params.style}
            />
            {params.error && (<p className='error-feedback'>{params.error}</p>)}
        </div>
    );
}

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    loading: false,
    style: {},
};

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
    style: PropTypes.object,
};

export default Input;