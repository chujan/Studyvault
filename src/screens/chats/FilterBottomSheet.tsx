import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text } from '@components';
import { styles } from './styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: {
    questionType: string;
    sortBy: string;
  }) => void;
  activeFilters: {
    questionType: string;
    sortBy: string;
  };
}

const FilterBottomSheet: React.FC<Props> = ({
  visible,
  onClose,
  onApply,
  activeFilters,
}) => {
  const [questionType, setQuestionType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (visible) {
      setQuestionType(activeFilters.questionType);
      setSortBy(activeFilters.sortBy);
    }
  }, [visible]);

  const Radio = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.radioRow} onPress={onPress}>
      <Text style={styles.radioText}>{label}</Text>
      <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.containered}>
          {/* Header */}
          <View style={styles.heade}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ fontSize: 18 }}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.titles}>Filter by</Text>

            <TouchableOpacity
              onPress={() => {
                setQuestionType('all');
                setSortBy('newest');
              }}
            >
              <Text style={styles.reset}>Reset filter</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {/* Question Type */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Question Type</Text>

              <Radio
                label="All Questions"
                selected={questionType === 'all'}
                onPress={() => setQuestionType('all')}
              />
              <Radio
                label="Recently Answered"
                selected={questionType === 'recent'}
                onPress={() => setQuestionType('recent')}
              />
              <Radio
                label="Unanswered Questions"
                selected={questionType === 'unanswered'}
                onPress={() => setQuestionType('unanswered')}
              />
            </View>

            {/* Sort */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort by</Text>

              <Radio
                label="Newest first"
                selected={sortBy === 'newest'}
                onPress={() => setSortBy('newest')}
              />
              <Radio
                label="Old first"
                selected={sortBy === 'old'}
                onPress={() => setSortBy('old')}
              />
              <Radio
                label="Most answered"
                selected={sortBy === 'liked'}
                onPress={() => setSortBy('liked')}
              />
            </View>
          </ScrollView>

          {/* Apply */}
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => {
              onApply({ questionType, sortBy });
              onClose();
            }}
          >
            <Text style={styles.applyText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterBottomSheet;