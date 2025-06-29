import { StyleSheet } from 'react-native';

// 기본 컨테이너
export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    minHeight: '100%',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
});

// 텍스트 스타일
export const textStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
  caption: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  error: {
    fontSize: 14,
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 8,
  },
});

// 버튼 스타일
export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#f6ae24',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f6ae24',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  disabled: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#f6ae24',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
});

// 입력 필드 스타일
export const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: '#f6ae24',
  },
  error: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
});

// 카드 스타일
export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  cardContent: {
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

// 구분선 스타일
export const dividerStyles = StyleSheet.create({
  horizontal: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  vertical: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
});

// 플렉스 유틸리티
export const flexStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
});

// 마진/패딩 유틸리티
export const spacingStyles = StyleSheet.create({
  m0: { margin: 0 },
  m1: { margin: 4 },
  m2: { margin: 8 },
  m3: { margin: 12 },
  m4: { margin: 16 },
  m5: { margin: 20 },
  mt0: { marginTop: 0 },
  mt1: { marginTop: 4 },
  mt2: { marginTop: 8 },
  mt3: { marginTop: 12 },
  mt4: { marginTop: 16 },
  mt5: { marginTop: 20 },
  mb0: { marginBottom: 0 },
  mb1: { marginBottom: 4 },
  mb2: { marginBottom: 8 },
  mb3: { marginBottom: 12 },
  mb4: { marginBottom: 16 },
  mb5: { marginBottom: 20 },
  ml0: { marginLeft: 0 },
  ml1: { marginLeft: 4 },
  ml2: { marginLeft: 8 },
  ml3: { marginLeft: 12 },
  ml4: { marginLeft: 16 },
  ml5: { marginLeft: 20 },
  mr0: { marginRight: 0 },
  mr1: { marginRight: 4 },
  mr2: { marginRight: 8 },
  mr3: { marginRight: 12 },
  mr4: { marginRight: 16 },
  mr5: { marginRight: 20 },
  p0: { padding: 0 },
  p1: { padding: 4 },
  p2: { padding: 8 },
  p3: { padding: 12 },
  p4: { padding: 16 },
  p5: { padding: 20 },
  pt0: { paddingTop: 0 },
  pt1: { paddingTop: 4 },
  pt2: { paddingTop: 8 },
  pt3: { paddingTop: 12 },
  pt4: { paddingTop: 16 },
  pt5: { paddingTop: 20 },
  pb0: { paddingBottom: 0 },
  pb1: { paddingBottom: 4 },
  pb2: { paddingBottom: 8 },
  pb3: { paddingBottom: 12 },
  pb4: { paddingBottom: 16 },
  pb5: { paddingBottom: 20 },
  pl0: { paddingLeft: 0 },
  pl1: { paddingLeft: 4 },
  pl2: { paddingLeft: 8 },
  pl3: { paddingLeft: 12 },
  pl4: { paddingLeft: 16 },
  pl5: { paddingLeft: 20 },
  pr0: { paddingRight: 0 },
  pr1: { paddingRight: 4 },
  pr2: { paddingRight: 8 },
  pr3: { paddingRight: 12 },
  pr4: { paddingRight: 16 },
  pr5: { paddingRight: 20 },
});
