export const monokaiCustomTheme = (isDarkMode: boolean) => {
  return {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      color: isDarkMode ? '#ddd' : '#444',
    },
    'hljs-tag': {
      color: '#569cd6',
    },
    'hljs-keyword': {
      color: '#569cd6',
      fontWeight: 'normal',
    },
    'hljs-selector-tag': {
      color: '#569cd6',
      fontWeight: 'normal',
    },
    'hljs-literal': {
      color: '#569cd6',
      fontWeight: 'normal',
    },
    'hljs-strong': {
      color: '#569cd6',
    },
    'hljs-name': {
      color: '#569cd6',
    },
    'hljs-code': {
      color: '#66d9ef',
    },
    'hljs-class .hljs-title': {
      color: 'gray',
    },
    'hljs-attribute': {
      color: '#bf79db',
    },
    'hljs-symbol': {
      color: '#bf79db',
    },
    'hljs-regexp': {
      color: '#bf79db',
    },
    'hljs-link': {
      color: '#bf79db',
    },
    'hljs-string': {
      color: `hsl(var(--brand-link))`,
    },
    'hljs-bullet': {
      color: '#3B63F3',
    },
    'hljs-subst': {
      color: '#3B63F3',
    },
    'hljs-title': {
      color: '#3B63F3',
      fontWeight: 'normal',
    },
    'hljs-section': {
      color: '#3B63F3',
      fontWeight: 'normal',
    },
    'hljs-emphasis': {
      color: '#3B63F3',
    },
    'hljs-type': {
      color: '#3B63F3',
      fontWeight: 'normal',
    },
    'hljs-built_in': {
      color: '#3B63F3',
    },
    'hljs-builtin-name': {
      color: '#3B63F3',
    },
    'hljs-selector-attr': {
      color: '#3B63F3',
    },
    'hljs-selector-pseudo': {
      color: '#3B63F3',
    },
    'hljs-addition': {
      color: '#3B63F3',
    },
    'hljs-variable': {
      color: '#3B63F3',
    },
    'hljs-template-tag': {
      color: '#3B63F3',
    },
    'hljs-template-variable': {
      color: '#3B63F3',
    },
    'hljs-comment': {
      color: isDarkMode ? '#999' : '#888',
    },
    'hljs-quote': {
      color: '#75715e',
    },
    'hljs-deletion': {
      color: '#75715e',
    },
    'hljs-meta': {
      color: '#75715e',
    },
    'hljs-doctag': {
      fontWeight: 'normal',
    },
    'hljs-selector-id': {
      fontWeight: 'normal',
    },
  }
}
