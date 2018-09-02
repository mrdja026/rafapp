import { StyleSheet } from 'react-native';

export const DEFAULT_FONT_COLOR = '#324291';
export const DEFAULT_BUTTON_COLOR = '#324291';
export const BORDER_COLOR = '#edcda3';

const _bigText = {
    fontSize: 20,
    color: DEFAULT_FONT_COLOR
};
const _smallText = {
    fontSize: 12,
    color: DEFAULT_FONT_COLOR
}
const _normalText = {
    fontSize: 16,
    color: DEFAULT_FONT_COLOR,
}

const _headingText = {
    fontSize: 25,
    color: DEFAULT_FONT_COLOR,
    fontWeight: 'bold',
}

const APPSTYLE = StyleSheet.create({
    bigText: _bigText,
    smallText: _smallText,
    headingText: _headingText,
    normalText: _normalText,
})

export default APPSTYLE; 
