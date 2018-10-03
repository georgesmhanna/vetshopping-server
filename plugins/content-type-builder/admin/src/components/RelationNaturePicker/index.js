/**
*
* RelationNaturePicker
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map, startCase ***REMOVED*** from 'lodash';
import pluralize from 'pluralize';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import RelationIco from 'components/RelationIco';

import OneWay from '../../assets/images/one_way.svg';
import OneWaySelected from '../../assets/images/one_way_selected.svg';
import ManyToMany from '../../assets/images/many_to_many.svg';
import ManyToManySelected from '../../assets/images/many_to_many_selected.svg';
import ManyToOne from '../../assets/images/many_to_one.svg';
import ManyToOneSelected from '../../assets/images/many_to_one_selected.svg';
import OneToMany from '../../assets/images/one_to_many.svg';
import OneToManySelected from '../../assets/images/one_to_many_selected.svg';
import OneToOne from '../../assets/images/one_to_one.svg';
import OneToOneSelected from '../../assets/images/one_to_one_selected.svg';

import styles from './styles.scss';

class RelationNaturePicker extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.icos = [
      ***REMOVED***
        name: 'oneWay',
        ico: OneWay,
        icoSelected: OneWaySelected,
***REMOVED***
      ***REMOVED***
        name: 'oneToOne',
        ico: OneToOne,
        icoSelected: OneToOneSelected,
***REMOVED***
      ***REMOVED***
        name: 'oneToMany',
        ico: OneToMany,
        icoSelected: OneToManySelected,
***REMOVED***
      ***REMOVED***
        name: 'manyToOne',
        ico: ManyToOne,
        icoSelected: ManyToOneSelected,
***REMOVED***
      ***REMOVED***
        name: 'manyToMany',
        ico: ManyToMany,
        icoSelected: ManyToManySelected,
***REMOVED***
    ];
***REMOVED***
  render() ***REMOVED***
    let contentTypeName = startCase(this.props.contentTypeName);
    let contentTypeTarget = startCase(this.props.contentTypeTarget);

    switch (this.props.selectedIco) ***REMOVED***
      case 'oneWay':
        break;
      case 'oneToMany':
        contentTypeTarget = pluralize(contentTypeTarget);
        break;
      case 'manyToOne':
        contentTypeName = contentTypeTarget;
        contentTypeTarget = pluralize(startCase(this.props.contentTypeName));
        break;
      case 'manyToMany':
        contentTypeName = pluralize(contentTypeName);
        contentTypeTarget = pluralize(contentTypeTarget);
        break;
      default:

***REMOVED***

    const relationText = this.props.selectedIco ? <FormattedMessage id=***REMOVED***`content-type-builder.relation.$***REMOVED***this.props.selectedIco***REMOVED***`***REMOVED***  /> : '';

    return (
      <div className=***REMOVED***styles.relationNaturePicker***REMOVED***>
        ***REMOVED***map(this.icos, (value, key) => (
          <RelationIco key=***REMOVED***key***REMOVED*** ico=***REMOVED***this.props.selectedIco === value.name ? value.icoSelected : value.ico***REMOVED*** name=***REMOVED***value.name***REMOVED*** onChange=***REMOVED***this.props.onChange***REMOVED*** />
        ))***REMOVED***
        <div className=***REMOVED***styles.infoContainer***REMOVED***>
          <span>
            ***REMOVED***contentTypeName***REMOVED***
          </span>
          &nbsp;
          ***REMOVED***relationText***REMOVED***
          &nbsp;
          <span>
            ***REMOVED***contentTypeTarget***REMOVED***
          </span>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

RelationNaturePicker.propTypes = ***REMOVED***
  contentTypeName: PropTypes.string,
  contentTypeTarget: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selectedIco: PropTypes.string,
***REMOVED***;

RelationNaturePicker.defaultProps = ***REMOVED***
  contentTypeName: '',
  contentTypeTarget: '',
  selectedIco: 'oneToOne',
***REMOVED***;

export default RelationNaturePicker;
