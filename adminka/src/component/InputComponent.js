import React, {Component} from 'react';

class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: this.props.value,
        }
    };

    componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
        this.setState({value: nextProps.value})
    }
    };


    createObj(value) {
    const {name} = this.props;
    return {
        name: name,
        value: value
    };
    }

    handleChangeValue = (e) => {
        this.setState({value: e.target.value});
        this.props.onChange(this.createObj(e.target.value));
    }

    handleSaveValue = () => {
        this.props.saveValue(this.createObj(this.state.value));
    }
    
    render(){
        const { value } = this.state;
        const { type, label, placeholder, disabled} = this.props;
        return (
            <div>
            {
              label &&
              <label >{`${label}`}</label>
            } 
            <input
            type={type}
            value={value}
            onChange={this.handleChangeValue}
            onBlur={this.handleSaveValue}
            placeholder={placeholder}
            disabled={disabled}
          />  
          </div> 
        )
    }

}

InputComponent.defaultProps = {
    value: '',
    label: '',
    placeholder: '',
    type: 'text',
    saveValue: () => {
    },
    onChange: () => {
    },
    onRemove: () => {
    },
};

export default InputComponent;