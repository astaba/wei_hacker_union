import { Component, ComponentType } from "react";

interface WrappedComponentProps {
  storageValue: string;
  setStorageValue: (value: string) => void;
}

const withLocalStorage = (
  WrappedComponent: ComponentType<WrappedComponentProps>,
  options: { storageKey: string; defaultValue: string },
) => {
  const { storageKey, defaultValue } = options;

  class WithLocalStorage extends Component<
    Record<string, never>,
    { value: string }
  > {
    constructor(props: Record<string, never>) {
      super(props);
      this.state = {
        // value: localStorage.getItem(storageKey) ?? defaultValue,
        value: localStorage.getItem(storageKey) || defaultValue,
      };
    }

    componentDidUpdate(
      _prevProps: Record<string, never>,
      prevState: { value: string },
    ): void {
      if (prevState.value !== this.state.value) {
        localStorage.setItem(storageKey, this.state.value);
      }
    }

    render() {
      return (
        <WrappedComponent
          storageValue={this.state.value}
          setStorageValue={(value: string) =>
            this.setState({ value: value.trim() })
          }
          {...this.props}
        />
      );
    }
  }

  return WithLocalStorage;
};

export default withLocalStorage;
