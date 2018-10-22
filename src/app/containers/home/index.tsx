import * as React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { push } from "react-router-redux";
import ReactTable from "react-table";

import { createCustomer, deleteCustomer, getCustomers } from "app/actions/customer";
import { ICustomer } from "app/models/customer";

export interface IHomeProps extends RouteComponentProps<void> {

}

export interface IHomeStateProps {
  customers: ICustomer[];
}

export interface IHomeDispatchProps {
  getCustomers: typeof getCustomers;
  createCustomer: typeof createCustomer;
  deleteCustomer: typeof deleteCustomer;
  goToLogin: () => void;
}

type THomeProps = IHomeProps & IHomeStateProps & IHomeDispatchProps;

class Home extends React.PureComponent<THomeProps, {}> {

  componentDidMount() {
    this.props.getCustomers();
  }

  private handleAddStudentClick = () => {
    this.props.createCustomer({ id: 999, firstName: "Alex", lastName: "Soares", email: "soares@gmail.com" });
  }
  private handleDeleteStudentClick = () => {
    this.props.deleteCustomer(6);
  }

  render() {

    const columns = [
      {
        Header: "ID",
        accessor: "id" // String-based value accessors!
      }, {
        Header: "First Name",
        accessor: "firstName"
      }, {
        Header: "Last Name",
        accessor: "lastName"
      }, {
        Header: "Email",
        accessor: "email"
      }
    ];
    return (
      <div>
        <Button onClick={this.handleAddStudentClick}>ADD SOARES !!!!!!!!!!!!!!!!!!!!!!!!</Button>
        <Button onClick={this.handleDeleteStudentClick}>DELETE !!!!!!!!!!!!!!!!!!!!!!!!</Button>
        <ReactTable
          data={this.props.customers}
          columns={columns}
        />
        <Button onClick={this.props.goToLogin}>Go to Login</Button>
      </div>
    );
  }
}

function mapStateToProps(state: any): IHomeStateProps {
  return {
    customers: state.customer.customers
  };
}

function mapDispatchToProps(dispatch: any): IHomeDispatchProps {
  return {
    getCustomers: () => dispatch(getCustomers()),
    createCustomer: (customer: ICustomer) => dispatch(createCustomer(customer)),
    deleteCustomer: (customerId: number) => dispatch(deleteCustomer(customerId)),
    goToLogin: () => dispatch(push("/login"))
  };
}

export default connect<IHomeStateProps, IHomeDispatchProps, IHomeProps>(mapStateToProps, mapDispatchToProps)(Home);