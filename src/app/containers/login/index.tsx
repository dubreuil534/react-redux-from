import * as React from "react";
import { Button, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

import { login } from "app/actions/login";
import { IUser } from "app/models/user";

export interface ILoginProps extends RouteComponentProps<void> {

}

export interface ILoginStateProps {

}

export interface ILoginDispatchProps {
    login: typeof login;
}

type TLoginProps = ILoginProps & ILoginStateProps & ILoginDispatchProps;

class Login extends React.PureComponent<TLoginProps, {}> {

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(event);
        event.preventDefault();
        const user: IUser = {
            username: "admin",
            password: "welcome1"
        };
        this.props.login(user);
    }

    render() {
        return (
            <div>
                <form name="login" onSubmit={this.handleSubmit}>
                    <FormControl
                        type="text"
                        placeholder="Username"
                    />
                    <FormControl
                        type="text"
                        placeholder="Password"
                    />
                    <Button type="submit">LOGIN</Button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(): ILoginStateProps {
    return {

    };
}

function mapDispatchToProps(dispatch: any): ILoginDispatchProps {
    return {
        login: (user: IUser) => dispatch(login(user)),
    };
}

export default connect<ILoginStateProps, ILoginDispatchProps, ILoginProps>(mapStateToProps, mapDispatchToProps)(Login);