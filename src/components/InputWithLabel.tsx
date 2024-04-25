import React from "react";

type InputWithLabelProps = {
  id: string;
  type?: string;
  value: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  isFocused?: boolean;
};

class InputWithLabel extends React.Component<InputWithLabelProps> {
  constructor(props: InputWithLabelProps) {
    super(props);
  }

  private inputRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    if (this.props.isFocused && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const { children, id, onSearchChange, value, type } = this.props;
    return (
      <>
        <label htmlFor={id}>{children}</label>&nbsp;
        <input
          id={id}
          type={type}
          value={value}
          onChange={onSearchChange}
          ref={this.inputRef}
        />
      </>
    );
  }
}

export default InputWithLabel;
