import React, {Component} from 'react';
import { withCookies } from 'react-cookie';

class Header extends Component {
    state = {
        token: this.props.cookies.get('mr-token')
    }

    logout = () => {
        this.props.cookies.remove('mr-token');
        window.location.href = '/';    
    }    

    render () {
        return (
            <React.Fragment>
                <div className="header">
                    <div className="logout-btn">
                        <button onClick={this.logout}>Logout</button>
                    </div>
                </div>               
            </React.Fragment> 
        )
    }
}

export default Header;
