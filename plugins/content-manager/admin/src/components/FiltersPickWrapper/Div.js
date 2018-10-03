import styled from 'styled-components';

const Div = styled.div`
  width: calc(100% + 60px);
  margin: $***REMOVED***props => props.show ? '-100px -30px 30px' : `-$***REMOVED***props.number***REMOVED***px -30px 103px`***REMOVED***;
  background: #fff;
  box-shadow: 3px 2px 4px #E3E9F3;
  padding: 18px 30px 0px 30px;
  transition: $***REMOVED***props => ***REMOVED***
    if (props.anim) ***REMOVED***
      return props.show ? 'margin-top .3s ease-out, margin-bottom .2s ease-out' : 'margin .3s ease-in';
***REMOVED***
***REMOVED******REMOVED***;
`;


export default Div;
