import { StyleSheet } from 'react-native';

export const DEFAULT_FONT_COLOR = '#324291';

const _bigText = {
    fontSize: 25,
    color: DEFAULT_FONT_COLOR
};
const _smallText = {
    fontSize: 15,
    color: DEFAULT_FONT_COLOR
}

const _headingText = {
    fontSize: 50,
    fontWeight: 'bold',
    color: DEFAULT_FONT_COLOR,
}

const APPSTYLE = StyleSheet.create({
    bigText: _bigText,
    smallText: _smallText,
    headingText: _headingText,
})

export default APPSTYLE; 
