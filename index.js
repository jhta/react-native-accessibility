
import { NativeModules, AccessibilityInfo, findNodeHandle, Platform, UIManager } from 'react-native';

const { RNAccessibility } = NativeModules;

const FOCUS_ON_VIEW = 8;

const announceForAccessibility = Platform.OS === 'android' ? RNAccessibility.announce : AccessibilityInfo.announceForAccessibility;

module.exports = {
    announceForAccessibility,
    focusOnView(ref) {
        if(!ref) {
            throw new Error('ref is not defined')
        }
        
        const reactTag = findNodeHandle(ref)
 
        if (!reactTag) {
            throw new Error('native node handle was not found for ref')
        }
        
        // for default focus screen on componentDidMount
        setTimeout(() => {
            Platform.OS === 'android' ? UIManager.sendAccessibilityEvent(
                reactTag,
                FOCUS_ON_VIEW
            ) : AccessibilityInfo.setAccessibilityFocus(reactTag)
        }, 10)
        
    }
}
