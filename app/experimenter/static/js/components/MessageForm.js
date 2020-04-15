import PropTypes from "prop-types";
import React from "react";
import { List, Map } from "immutable";
import { Row, Col } from "react-bootstrap";

import { MESSAGE_TYPE_CHOICES } from "experimenter/components/constants";
import BranchManager from "experimenter/components/BranchManager";
import MessageBranchFields from "experimenter/components/MessageBranchFields";
import RadioButton from "experimenter/components/RadioButton";

export default class MessageForm extends React.PureComponent {
  static propTypes = {
    data: PropTypes.instanceOf(Map),
    errors: PropTypes.instanceOf(Map),
    handleDataChange: PropTypes.func,
    handleErrorsChange: PropTypes.func,
  };

  render() {
    return (
      <div>
        <Row>
          <Col md={{ span: 10, offset: 2 }}>
            <RadioButton
              elementLabel="What message template does this experiment use?"
              fieldName="message_type"
              choices={MESSAGE_TYPE_CHOICES.map(([value, label]) => {
                return { label, value };
              })}
              value={this.props.data.get("message_type")}
              error={this.props.errors.get("message_type")}
              onChange={(event) =>
                this.props.handleDataChange("message_type", event.target.value)
              }
            />
          </Col>
        </Row>

        <hr className="heavy-line my-5" />

        <BranchManager
          branchFieldsComponent={MessageBranchFields}
          branches={this.props.data.get("variants", new List())}
          errors={this.props.errors.get("variants", new List())}
          handleDataChange={this.props.handleDataChange}
          handleErrorsChange={this.props.handleErrorsChange}
        />
      </div>
    );
  }
}