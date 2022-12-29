import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  // Specific React function where you can state how the state
  // of the component should or shouldn't change given an error.
  static getDerivedStateFromError() {
    return { hasError: true, redirect: false };
  }

  // Once an error gets catched, do the following.
  componentDidCatch(error, info) {
    console.error(error, info);
  }

  // Once the state or props get updated, this lifecycle method gets invoked.
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          There was an error. Oh no. What are we going to do. JK.
          <Link to="/">Click here</Link> to go to the homepage. Or wait five
          seconds and we will do it for you. Or not. I am not your mom.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
