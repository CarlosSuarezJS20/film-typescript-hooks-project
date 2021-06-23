import React, { Component, useEffect } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

interface alertComProps {
  message: string;
}

const AlertCom: React.FC<alertComProps> = ({ message }) => {
  const alert = useAlert();
  useEffect(() => {
    alert.error(message);
  }, [message]);
  return <React.Fragment></React.Fragment>;
};

const withErrorHandler = (WrappedComponent: any) => {
  return class extends Component {
    state: { error: any; reqInterceptor: any; resInterceptor: any } = {
      error: null,
      reqInterceptor: null,
      resInterceptor: null,
    };

    componentWillMount() {
      this.state.reqInterceptor = axios.interceptors.request.use((req: any) => {
        this.setState({ error: null });
        return req;
      });
      this.state.resInterceptor = axios.interceptors.response.use(
        (res: any) => res,
        (error: any) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.state.reqInterceptor);
      axios.interceptors.response.eject(this.state.resInterceptor);
    }

    render() {
      return (
        <React.Fragment>
          {this.state.error ? (
            <AlertCom
              message={"there was an error, please refresh page or try later"}
            />
          ) : null}

          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
