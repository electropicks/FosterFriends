import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAnother: false,
    }
    this.ref = React.createRef();
  }

  // Use jQuery and Bootstrap js to show/hide modal
  toggleModal = () => {
    $(this.ref.current).modal('toggle');
  }

  onCancel = () => {
    this.props.onCancel();
    this.toggleModal();
  }

  onSubmit = () => {
    this.props.onSubmit();

    // Skip next step (hide modal) if we are in create mode and
    // create another is checked
    if (this.state.createAnother) {
      return;
    }

    // Hide modal
    this.toggleModal();
  }

  handleInputChange = (e) => {
    this.setState({
      createAnother: !this.state.createAnother,
    })
  }

  render() {
    return (
      <div className={this.props.createMode ? 'modal-style' : 'modal-style-inline'}>
        <button
          className={this.props.btnClass || 'btn btn-primary'}
          onClick={this.toggleModal}>
          {this.props.btnLabel ? this.props.btnLabel : 'Launch Modal' }
        </button>
        <div ref={this.ref} className='modal fade' data-backdrop={this.props.backdrop}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>
                  {this.props.title}
                </h5>
                <button
                  className='close'
                  onClick={this.onCancel}>
                  <span>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                {this.props.children}
              </div>
              <div className='modal-footer'>
                { this.props.createMode &&
                  <div className='mr-auto'>
                    <input
                      className='create-another'
                      type="checkbox"
                      readOnly
                      checked={this.state.createAnother}
                      onChange={this.handleInputChange}
                    />
                    <span className='create-another'>Create Another</span>
                  </div>
                }
                <button
                  className="btn btn-primary"
                  onClick={this.onSubmit}>
                  {this.props.createMode ? 'Create' : 'Update'}
                </button>
                <button
                  className='btn btn-primary'
                  onClick={this.onCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  btnLabel: PropTypes.string,
  title: PropTypes.string,
  footer: PropTypes.object,
  btnClass: PropTypes.string,
  backdrop: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  createMode: PropTypes.bool,
};

