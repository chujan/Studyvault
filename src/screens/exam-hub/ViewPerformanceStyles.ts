import { StyleSheet } from 'react-native';
import { RS } from '@helpers';
import { palette, family } from '@theme';

export const styles = StyleSheet.create({
  /* ================= CONTAINER ================= */
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ================= HEADER ================= */
  header: {
    height: RS(56),
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  backButton: {
    position: 'absolute',
    left: RS(20),
    padding: RS(6),
  },

  headerTitle: {
    fontSize: RS(16),
    fontWeight: '600',
    color: '#111',
  },

  /* ================= TIME SPENT ================= */
  label: {
    fontSize: RS(12),
    color: '#888',
    marginBottom: RS(4),
  },

  timeText: {
    fontSize: RS(14),
    color: '#333',
  },

  timeBold: {
    fontWeight: '700',
    color: '#000',
  },

  writeTestBtn: {
    backgroundColor: palette.blue,
    paddingHorizontal: RS(18),
    paddingVertical: RS(10),
    borderRadius: RS(22),
  },

  writeTestText: {
    color: '#FFF',
    fontSize: RS(13),
    fontWeight: '600',
  },

  /* ================= SUBJECT PILLS ================= */
  subjectPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF3FF',
    paddingHorizontal: RS(14),
    paddingVertical: RS(8),
    borderRadius: RS(20),
    marginRight: RS(10),
  },

  activePill: {
     backgroundColor: '#EBF3FF',
    borderWidth: 1,
    borderColor: palette.blue,
  },

  subjectText: {
    fontSize: RS(13),
    color: '#444',
    marginRight: RS(6),
  },

  activeSubjectText: {
    fontSize: RS(13),
    color: palette.blue,
    fontWeight: '600',
    marginRight: RS(6),
  },

  /* ================= QUESTION CARD ================= */
  card: {
    backgroundColor: '#FFF',
    borderRadius: RS(14),
    padding: RS(16),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  questionTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#EBF3FF',
    paddingHorizontal: RS(12),
    paddingVertical: RS(4),
    borderRadius: RS(12),
    marginBottom: RS(12),
  },

  questionTagText: {
    fontSize: RS(12),
    color: palette.blue,
    fontWeight: '600',
  },

  questionText: {
    fontSize: RS(15),
    color: '#111',
    lineHeight: RS(22),
    marginBottom: RS(18),
  },

  /* ================= OPTIONS ================= */
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RS(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  optionCircle: {
    width: RS(26),
    height: RS(26),
    borderRadius: RS(13),
   
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RS(12),
  },

  optionLabel: {
    color: '#FFF',
    fontSize: RS(12),
    fontWeight: '600',
  },

  optionText: {
    fontSize: RS(14),
    color: '#333',
  },

  /* ================= EXPLANATION BUTTON ================= */
  explainBtn: {
    marginTop: RS(18),
    backgroundColor: palette.blue,
    paddingVertical: RS(12),
    borderRadius: RS(24),
    alignItems: 'center',
  },

  explainText: {
    color: '#FFF',
    fontSize: RS(14),
    fontWeight: '600',
  },

  /* ================= PAGINATION ================= */
  pageBox: {
    width: RS(34),
    height: RS(34),
    borderRadius: RS(20),
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: RS(4),
  },

  activePage: {
    backgroundColor: palette.blue,
    borderColor: palette.blue,
  },

  pageText: {
    fontSize: RS(13),
    color: '#444',
  },

  activePageText: {
    fontSize: RS(13),
    color: '#FFF',
    fontWeight: '600',
  },

  explanationContainer: {
  marginTop: RS(12),
  backgroundColor: '#F5F5F5',
  padding: RS(12),
  borderRadius: RS(8),
},
explanationText: {
  fontSize: RS(14),
  color: '#333',
  lineHeight: RS(20),
},

});