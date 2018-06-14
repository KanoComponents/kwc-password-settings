/**
`kwc-password-settings`

A small component to allow users to update their password.

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@kano/kwc-style/kwc-style.js';
import '@kano/kwc-button/kwc-button.js';
import { Behaviour as ValidationBehavior } from '@kano/kwc-behaviors/kano-validation.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
        <style is="custom-style" include="input-text">
            :root {
                --paper-spinner-color: white;
            }
            :host {
                display: block;
            }
            :host h3 {
                color: var(--color-black);
                font-family: var(--font-heading);
                font-size: 18px;
                margin: 0 0 32px 0;
                text-transform: uppercase;
            }
            :host p,
            :host li {
                color: var(--color-black);
                font-family: var(--font-body);
                margin: 0;
            }
            :host .content {
                position: relative;
            }
            :host form {
                @apply --layout-vertical;
                @apply --layout-start-justified;
                @apply --layout-start;
            }
            :host input {
                margin-bottom: 16px;
                width: 100%;
            }
            :host input[valid] {
                border-color: var(--color-grassland);
            }
            :host input[invalid] {
                border-color: var(--color-cinnabar);
            }
            :host .footer {
                @apply --layout-horizontal;
                @apply --layout-start-justified;
                @apply --layout--start;
            }
            :host .messages {
                margin-left: 16px;
            }
            :host .errors {
                @apply --layout-flex-auto;
                list-style: none;
                margin: 0;
                min-height: 16px;
                padding: 0;
            }
            :host .message ~ .message {
                margin-top: 8px;
            }
            :host paper-spinner-lite {
                display: block;
                margin: auto;
            }
            :host *[hidden] {
                display: none !important;
            }
        </style>
        <h3>Password</h3>
        <div class="content">
            <form on-submit="_updatePassword">
                <input id="_current" type="password" value="{{_current::input}}" on-focus="_clearErrors" on-keyup="_validateCurrent" placeholder="Your current password" valid\$="[[_inputValid(_validations._current, _current)]]" invalid\$="[[_inputInvalid(_validations._current, _current)]]" no-validation="" required="">
                <input id="_update" type="password" value="{{_update::input}}" on-focus="_clearErrors" on-keyup="_validateUpdate" placeholder="Your new password" valid\$="[[_inputValid(_validations._update, _update)]]" invalid\$="[[_inputInvalid(_validations._update, _update)]]" no-validation="" required="">
                <input id="_confirmation" type="password" value="{{_confirmation::input}}" on-focus="_clearErrors" on-keyup="_validateConfirmation" placeholder="Please confirm your password" valid\$="[[_inputValid(_validations._confirmation, _confirmation)]]" invalid\$="[[_inputInvalid(_validations._confirmation, _confirmation)]]" no-validation="" required="">
                <div class="footer">
                    <div class="actions">
                         <kwc-button hidden\$="[[!_displaySubmission]]" disabled\$="[[!_submissionEnabled]]" type="submit" variant="tertiary" square="" on-tap="_updatePassword">
                              <span hidden\$="[[updating]]">Update</span>
                              <paper-spinner-lite active="[[updating]]"></paper-spinner-lite>
                          </kwc-button>
                          <kwc-button type="button" hidden\$="[[!_displayError]]" icon-id="kwc-ui-icons:close" variant="warning" square="" on-tap="_reset">
                          </kwc-button>
                          <kwc-button type="button" hidden\$="[[!updated]]" icon-id="kwc-ui-icons:tick" variant="secondary" square="" on-tap="_reset">
                          </kwc-button>
                      </div>
                      <div class="messages">
                          <ul class="errors" hidden\$="[[!_displayError]]">
                              <template is="dom-repeat" items="[[_errorMessages]]">
                                  <li class="error">[[item]]</li>
                              </template>
                          </ul>
                          <p class="success message" hidden\$="[[!updated]]">Success! Your password has been updated.</p>
                          <p class="error message" hidden\$="[[!_updateError]]">Sorry, something went wrong. Please try again.</p>
                      </div>
                </div>
            </form>
        </div>
`,

  is: 'kwc-password-settings',

  behaviors: [
      ValidationBehavior
  ],

  properties: {
      /** The user's current password */
      _current: {
          type: String,
          value: ''
      },
      /**
       * Boolean to indicate whether errors should be
       * displayed
       */
      _displayError: {
          type: Boolean,
          computed: '_computeErrorDisplay(errors.*, _updateError)'
      },
      /**
       * Boolean to indicate whether the submit button should
       * be displayed
       */
      _displaySubmission: {
          type: Boolean,
          computed: '_computeSubmissionDisplay(errors.*, _updateError, updated)'
      },
      /** The update error (if applicable) */
      error: {
          type: String,
          value: null
      },
      /** The errors for each field in the form */
      errors: {
          type: Object,
          value: () => {
              return {}
          }
      },
      /** An array of error messages computed from the errors object */
      _errorMessages: {
          type: Array,
          computed: '_computeErrorMessages(errors.*)'
      },
      /** The user's new password (confirmed) */
      _confirmation: {
          type: String,
          value: ''
      },
      _submissionEnabled: {
          type: Boolean,
          computed: '_computeSubmissionEnabled(valid, updating)'
      },
      /** The user's new password */
      _update: {
          type: String,
          value: ''
      },
      /**
       * Boolean to indicate whether there has been an error with
       * the update
       */
      _updateError: {
          type: Boolean,
          computed: '_computeUpdateError(error)'
      },
      /** Boolean to indicate whether the email has been updated */
      updated: {
          type: Boolean,
          value: false
      },
      /** Boolean to indicate whether the email is updating */
      updating: {
          type: Boolean,
          value: false
      },
      /** Whether the form component is valid */
      valid: {
          type: Boolean,
          computed: '_computeValidity(_validations.*)',
          notify: true
      },
      /** The validation status for each field in the form */
      _validations: {
          type: Object,
          value: () => {
              return {
                  _current: false,
                  _confirmation: false,
                  _update: false
              }
          }
      }
  },

  /**
   * Clear all errors when the user begins submitting a field
   * @param {Event} e The focus event from the text input
   */
  _clearErrors (e) {
      this.set('errors.password', null);
      this.set(`errors.${e.target.id}`, null);
  },

  /**
   * Compute whether the error should be displayed
   * @param {Object} errors The `errors` update object
   * @param {Boolean} _updateError
   * @returns {Boolean}
   */
  _computeErrorDisplay(errors, _updateError) {
      let display = false;
      if (_updateError) {
          display = true;
          return display;
      }
      if (errors && errors.base) {
          for (let type in errors.base) {
              if (errors.base[type]) {
                  display = true;
              }
          }
      }
      return display;
  },

  /**
   * Generate an array of error messages from the errors object
   * @param {Object} errors
   * @returns {Array}
   */
  _computeErrorMessages (errors) {
      let messages = [];
      if (!errors || !errors.base) {
          return messages;
      }
      for (let type in errors.base) {
          messages.push(errors.base[type]);
      }
      return messages.filter(message => {
          return message !== null && message !== undefined;
      });
  },

  /**
   * Compute whether the submission button should be displayed
   * @param {Object} errors The `errors` update object
   * @param {Boolean} _updateError
   * @param {Boolean} updated
   * @returns {Boolean}
   */
  _computeSubmissionDisplay (errors, _updateError, updated) {
      let display = true;
      if (_updateError || updated) {
           display = false;
           return display;
      }
      if (errors && errors.base) {
          for (let type in errors.base) {
              if (errors.base[type]) {
                  display = false;
              }
          }
      }
      return display;
  },

  /**
   * Compute whether the submission button should be enabled
   * @param {Boolean} valid
   * @param {Boolean} updating
   * @returns {Boolean}
   */
  _computeSubmissionEnabled (valid, updating) {
      return valid && !updating;
  },

  /**
   * Return a boolean to indicate whether there is an update error
   * @param {String} error
   * @returns {Boolean}
   */
  _computeUpdateError (error) {
      return error && error.length ?true : false;
  },

  /**
   * Compute whether the input is invalid
   * @param {Boolean} validation The validation for this field
   * @param {String} property The text input value
   * @returns {Boolean}
   */
  _inputInvalid (validation, property) {
      let fieldSet = property && property.length ? true : false;
      return fieldSet && !validation;
  },

  /**
   * Compute whether the input is valid
   * @param {Boolean} validation The validation for this field
   * @param {String} property The text input value
   * @returns {Boolean}
   */
  _inputValid (validation, property) {
      return validation && property && property.length ? true : false;
  },

  /**
   * Check whether the component is valid – there are no invalid fields
   * @param {Object} validations Update from `validations` changes
   * @returns {Boolean}
   */
  _computeValidity (validations) {
      let valid = true;
      if (!validations || !validations.base) {
          valid = false;
      } else {
          for (let validation in validations.base) {
              if (!validations.base[validation]) {
                  valid = false;
              }
          }
      }
      return valid;
  },

  /** Reset the component */
  _reset () {
      this.set('updated', false);
      this.set('updating', false);
      this.set('error', null);
      this.set('_current', '');
      this.set('_update', '');
      this.set('_confirmation', '');
      this.set('errors', {});
      this.set('_validations', {
          _confirmation: false,
          _update: false
      });
  },

  /**
   * Fire the event to the parent to update the password
   * @param {Event} e The submit event from the form
   */
  _updatePassword (e) {
      e.preventDefault();
      if (this.valid) {
          this.fire('update-password', {
              current: this._current,
              new: this._update
          });
      }
  },

  /**
   * Validate that the confirmation password matches the main update
   * @param {Event} e The blur event from the input field
   */
  _validateConfirmation (e) {
      this.debounce('validate-confirmation', () => {
          let element = this.setElement(e, '#_confirmation');
          if (this._validatePassword(e, '#_confirmation')) {
              if (element.value === this._update) {
                  this.set('_validations._confirmation', true);
                  this.set('errors._confirmation', null);
              } else {
                  this.set('_validations._confirmation', false);
                  this.set('errors._confirmation', 'The password confirmation does not match');
              }
          }
      }, 500);
  },

  /**
   * Validate that the current password with debouncer
   * @param {Event} e The blur event from the input field
   */
  _validateCurrent (e) {
      this.debounce('validate-current', () => {
          this._validatePassword(e, '#_current');
      }, 500);
  },

  /**
   * Validate that the new password is not the same as the old one
   * @param {Event} e The blur event from the input field
   */
  _validateUpdate (e) {
      this.debounce('validate-update', () => {
          let element = this.setElement(e, '#_update');
          if (element.value === this._current) {
              this.set('_validations._update', false);
              this.set('errors._update', 'Your new password cannot be the same as your old one');
          } else {
              this._validatePassword(e, '#_update');
              this.set('errors._update', null);
          }
      }, 500);
  },

  /**
   * Validate the password given
   * @param {Event} e The blur event from the input field
   * @returns {Boolean}
   */
  _validatePassword (e, inputId) {
      let element = this.setElement(e, inputId),
          valid = this.validatePassword(element.value);
      this.set(`_validations.${element.id}`, valid);
      if (valid) {
          this.set(`errors.${element.id}`, null);
          this.set('errors.password', null);
      }
      return valid;
  },

  /**
   * Set validation element (Path only exists in Chrome)
   * @param {Event} e The blur event from the input field
   * @param {Event} inputId The selected input element id
   * @returns {Element}
   */
  setElement (e, inputId) {
      if (e.path) {
          return e.path[0];
      } else {
          return dom(this.root).querySelector(inputId);
      }
  }
});
