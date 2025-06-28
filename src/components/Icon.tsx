import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#000',
  style,
}) => {
  const getIconSymbol = (iconName: string): string => {
    const iconMap: Record<string, string> = {
      // 기본 아이콘들
      'arrow-left': '←',
      'arrow-right': '→',
      'arrow-up': '↑',
      'arrow-down': '↓',
      close: '×',
      check: '✓',
      search: '🔍',
      home: '🏠',
      user: '👤',
      settings: '⚙️',
      heart: '❤️',
      star: '⭐',
      cart: '🛒',
      bell: '🔔',
      mail: '📧',
      phone: '📞',
      location: '📍',
      calendar: '📅',
      clock: '🕐',
      edit: '✏️',
      delete: '🗑️',
      add: '+',
      minus: '-',
      menu: '☰',
      share: '📤',
      download: '⬇️',
      upload: '⬆️',
      play: '▶️',
      pause: '⏸️',
      stop: '⏹️',
      volume: '🔊',
      mute: '🔇',
      camera: '📷',
      image: '🖼️',
      video: '🎥',
      music: '🎵',
      file: '📄',
      folder: '📁',
      link: '🔗',
      lock: '🔒',
      unlock: '🔓',
      eye: '👁️',
      'eye-off': '🙈',
      wifi: '📶',
      battery: '🔋',
      bluetooth: '📡',
      gps: '🎯',
      filter: '🔍',
      sort: '↕️',
      refresh: '🔄',
      sync: '🔄',
      backup: '💾',
      restore: '📥',
      export: '📤',
      import: '📥',
      print: '🖨️',
      scan: '📱',
      'qr-code': '📱',
      barcode: '📊',
      tag: '🏷️',
      price: '💰',
      discount: '💸',
      gift: '🎁',
      trophy: '🏆',
      medal: '🥇',
      crown: '👑',
      fire: '🔥',
      'star-filled': '⭐',
      'star-empty': '☆',
      'heart-filled': '❤️',
      'heart-empty': '🤍',
      'thumbs-up': '👍',
      'thumbs-down': '👎',
      like: '👍',
      dislike: '👎',
      comment: '💬',
      reply: '↩️',
      forward: '↪️',
      send: '📤',
      receive: '📥',
      inbox: '📥',
      outbox: '📤',
      draft: '📝',
      archive: '📦',
      trash: '🗑️',
      spam: '🚫',
      flag: '🚩',
      bookmark: '🔖',
      'bookmark-filled': '🔖',
      'bookmark-empty': '🔖',
      history: '📚',
      favorite: '⭐',
      'favorite-filled': '⭐',
      'favorite-empty': '☆',
      rating: '⭐',
      review: '📝',
      feedback: '💭',
      support: '🆘',
      help: '❓',
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌',
      success: '✅',
      loading: '⏳',
      pending: '⏳',
      completed: '✅',
      cancelled: '❌',
      expired: '⏰',
      scheduled: '📅',
      ongoing: '🔄',
      finished: '🏁',
      start: '🚀',
      end: '🏁',
      next: '⏭️',
      previous: '⏮️',
      first: '⏪',
      last: '⏩',
      skip: '⏭️',
      rewind: '⏪',
      'fast-forward': '⏩',
      shuffle: '🔀',
      repeat: '🔁',
      loop: '🔁',
      random: '🎲',
      dice: '🎲',
      game: '🎮',
      puzzle: '🧩',
      chess: '♟️',
      cards: '🃏',
      'dice-1': '⚀',
      'dice-2': '⚁',
      'dice-3': '⚂',
      'dice-4': '⚃',
      'dice-5': '⚄',
      'dice-6': '⚅',
    };

    return iconMap[iconName] || '?';
  };

  return (
    <Text
      style={[
        styles.icon,
        {
          fontSize: size,
          color: color,
        },
        style,
      ]}
    >
      {getIconSymbol(name)}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
});

export default Icon;
