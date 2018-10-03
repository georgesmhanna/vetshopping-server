/*
 *
 * HomePage
 *
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import Helmet from 'react-helmet';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import PropTypes from 'prop-types';
import ***REMOVED*** get, isEmpty, upperFirst ***REMOVED*** from 'lodash';
import cn from 'classnames';

import Block from 'components/HomePageBlock';
import Button from 'components/Button';
import Sub from 'components/Sub';
import Input from 'components/InputText';
import SupportUsCta from 'components/SupportUsCta';
import SupportUsTitle from 'components/SupportUsTitle';

import ***REMOVED*** selectPlugins ***REMOVED*** from 'containers/App/selectors';

import auth from 'utils/auth';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import validateInput from 'utils/inputsValidations';

import BlockLink from './BlockLink';
import CommunityContent from './CommunityContent';
import CreateContent from './CreateContent';
import SocialLink from './SocialLink';
import WelcomeContent from './WelcomeContent';

import ***REMOVED*** getArticles, onChange, submit ***REMOVED*** from './actions';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';

const FIRST_BLOCK = [
  ***REMOVED***
    title: ***REMOVED***
      id: 'app.components.HomePage.welcome',
***REMOVED***,
    content: () => <WelcomeContent />,
***REMOVED***,
  ***REMOVED***
    title: ***REMOVED***
      id: 'app.components.HomePage.create',
***REMOVED***,
    content: () => <CreateContent />,
***REMOVED***,
];

const FIRST_BLOCK_LINKS = [
  ***REMOVED***
    link: 'https://strapi.io/documentation/',
    content: ***REMOVED***
      id: 'app.components.BlockLink.documentation.content',
***REMOVED***,
    isDocumentation: true,
    title: ***REMOVED***
      id: 'app.components.BlockLink.documentation',
***REMOVED***,
***REMOVED***,
  ***REMOVED***
    link: 'https://github.com/strapi/strapi-examples',
    content: ***REMOVED***
      id: 'app.components.BlockLink.code.content',
***REMOVED***,
    isDocumentation: false,
    title: ***REMOVED***
      id: 'app.components.BlockLink.code',
***REMOVED***,
***REMOVED***,
];

const SECOND_BLOCK = ***REMOVED***
  title: ***REMOVED***
    id: 'app.components.HomePage.community',
***REMOVED***,
  content: () => <CommunityContent />,
***REMOVED***;

const SOCIAL_LINKS = [
  ***REMOVED***
    name: 'GitHub',
    link: 'https://github.com/strapi/strapi/',
***REMOVED***,
  ***REMOVED***
    name: 'Slack',
    link: 'https://slack.strapi.io/',
***REMOVED***,
  ***REMOVED***
    name: 'Medium',
    link: 'https://medium.com/@strapi',
***REMOVED***,
  ***REMOVED***
    name: 'Twitter',
    link: 'https://twitter.com/strapijs',
***REMOVED***,
  ***REMOVED***
    name: 'Reddit',
    link: 'https://www.reddit.com/r/node/search?q=strapi',
***REMOVED***,
  ***REMOVED***
    name: 'Stack Overflow',
    link: 'https://stackoverflow.com/questions/tagged/strapi',
***REMOVED***,
];

export class HomePage extends React.PureComponent ***REMOVED***
  // eslint-disable-line react/prefer-stateless-function
  state = ***REMOVED*** errors: [] ***REMOVED***;

  componentDidMount() ***REMOVED***
    this.props.getArticles();
***REMOVED***

  handleSubmit = e => ***REMOVED***
    e.preventDefault();
    const errors = validateInput(this.props.homePage.body.email, ***REMOVED*** required: true ***REMOVED***, 'email');
    this.setState(***REMOVED*** errors ***REMOVED***);

    if (isEmpty(errors)) ***REMOVED***
      return this.props.submit();
***REMOVED***
***REMOVED***;

  showFirstBlock = () =>
    get(this.props.plugins.toJS(), 'content-manager.leftMenuSections.0.links', []).length === 0;

  renderButton = () => ***REMOVED***
    const data = this.showFirstBlock()
      ? ***REMOVED***
        className: styles.homePageTutorialButton,
        href: 'https://strapi.io/documentation/getting-started/quick-start.html#create-your-first-api',
        id: 'app.components.HomePage.button.quickStart',
        primary: true,
***REMOVED***
      : ***REMOVED***
        className: styles.homePageBlogButton,
        id: 'app.components.HomePage.button.blog',
        href: 'https://blog.strapi.io/',
        primary: false,
***REMOVED***;

    return (
      <a href=***REMOVED***data.href***REMOVED*** target="_blank">
        <Button className=***REMOVED***data.className***REMOVED*** primary=***REMOVED***data.primary***REMOVED***>
          <FormattedMessage id=***REMOVED***data.id***REMOVED*** />
        </Button>
      </a>
    );
***REMOVED***;

  render() ***REMOVED***
    const ***REMOVED*** homePage: ***REMOVED*** articles, body ***REMOVED*** ***REMOVED*** = this.props;
    const WELCOME_AGAIN_BLOCK = [
      ***REMOVED***
        title: ***REMOVED***
          id: 'app.components.HomePage.welcome.again',
  ***REMOVED***
        name: upperFirst(`$***REMOVED***get(auth.getUserInfo(), 'username')***REMOVED***!`),
        content: () => <WelcomeContent hasContent />,
***REMOVED***
    ];

    return (
      <div className=***REMOVED***cn('container-fluid', styles.containerFluid)***REMOVED***>
        <Helmet title="Home Page" />
        <div className="row">
          <div className="col-md-8 col-lg-8">
            <Block>
              ***REMOVED***this.showFirstBlock() &&
                FIRST_BLOCK.map((value, key) => (
                  <Sub key=***REMOVED***key***REMOVED*** ***REMOVED***...value***REMOVED*** underline=***REMOVED***key === 0***REMOVED*** bordered=***REMOVED***key === 0***REMOVED*** />
                ))***REMOVED***
              ***REMOVED***!this.showFirstBlock() &&
                WELCOME_AGAIN_BLOCK.concat(articles).map((value, key) => (
                  <Sub
                    key=***REMOVED***key***REMOVED***
                    ***REMOVED***...value***REMOVED***
                    bordered=***REMOVED***key === 0***REMOVED***
                    style=***REMOVED***key === 1 ? ***REMOVED*** marginBottom: '33px' ***REMOVED*** : ***REMOVED******REMOVED******REMOVED***
                    underline=***REMOVED***key === 0***REMOVED***
                  />
                ))***REMOVED***
              ***REMOVED***this.renderButton()***REMOVED***
              <div className=***REMOVED***styles.homePageFlex***REMOVED***>
                ***REMOVED***FIRST_BLOCK_LINKS.map((value, key) => <BlockLink ***REMOVED***...value***REMOVED*** key=***REMOVED***key***REMOVED*** />)***REMOVED***
              </div>
            </Block>
            <Block>
              <Sub ***REMOVED***...SECOND_BLOCK***REMOVED*** />
              <div className=***REMOVED***styles.homePageFlex***REMOVED***>
                <div className="row" style=***REMOVED******REMOVED*** width: '100%', marginRight: '0' ***REMOVED******REMOVED***>
                  ***REMOVED***SOCIAL_LINKS.map((value, key) => <SocialLink key=***REMOVED***key***REMOVED*** ***REMOVED***...value***REMOVED*** />)***REMOVED***
                </div>
                <div className=***REMOVED***styles.newsLetterWrapper***REMOVED***>
                  <div>
                    <FormattedMessage id="app.components.HomePage.newsLetter" />
                  </div>
                  <form onSubmit=***REMOVED***this.handleSubmit***REMOVED***>
                    <div className=***REMOVED***cn(styles.homePageForm, 'row')***REMOVED***>
                      <div className="col-md-12">
                        <Input
                          value=***REMOVED***body.email***REMOVED***
                          onChange=***REMOVED***this.props.onChange***REMOVED***
                          name=""
                          placeholder="johndoe@gmail.com"
                          error=***REMOVED***!isEmpty(this.state.errors)***REMOVED***
                        />
                        <FormattedMessage id="app.components.HomePage.cta">
                          ***REMOVED***message => <button type="submit">***REMOVED***message***REMOVED***</button>***REMOVED***
                        </FormattedMessage>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Block>
          </div>
          <div className="col-lg-4 col-md-4">
            <Block className=***REMOVED***styles.blockShirt***REMOVED***>
              <div>
                <SupportUsTitle />
                <FormattedMessage id="app.components.HomePage.support.content">
                  ***REMOVED***message => <p>***REMOVED***message***REMOVED***</p>***REMOVED***
                </FormattedMessage>
                <SupportUsCta />
              </div>
            </Block>
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

HomePage.propTypes = ***REMOVED***
  getArticles: PropTypes.func.isRequired,
  homePage: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  plugins: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
***REMOVED***;

const mapStateToProps = createStructuredSelector(***REMOVED***
  homePage: makeSelectHomePage(),
  plugins: selectPlugins(),
***REMOVED***);

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      getArticles,
      onChange,
      submit,
***REMOVED***,
    dispatch,
  );
***REMOVED***

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer(***REMOVED*** key: 'homePage', reducer ***REMOVED***);
const withSaga = injectSaga(***REMOVED*** key: 'homePage', saga ***REMOVED***);

// export default connect(mapDispatchToProps)(HomePage);
export default compose(withReducer, withSaga, withConnect)(HomePage);
