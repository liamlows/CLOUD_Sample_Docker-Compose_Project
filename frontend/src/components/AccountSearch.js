import React, { useState, useEffect } from 'react';

export const AccountSearch = props => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");

    return <div className="row">
        <div className="col-6">
            <div className="form-group">
                <label htmlFor="search_name">Name</label>
                <input type="text"
                    id="search_name"
                    name="search_name"
                    value={ name }
                    className="form-control"
                    onChange={ event => setName(event.target.value) } />
            </div>
        </div>
        <div className="col-6">
        <div className="form-group">
                <label htmlFor="search_email">Email</label>
                <input type="text"
                    id="search_email"
                    name="search_email"
                    value={ email }
                    className="form-control"
                    onChange={ event => setEmail(event.target.value) } />
            </div>

        </div>
        <div className="col-12">
            <button className="btn btn-primary btn-block" onClick={ () => props.onSearch({ name, email }) } >Search</button>
        </div>
    </div>
};