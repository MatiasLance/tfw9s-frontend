import * as XLSX from 'xlsx';
import random from './random';
export default {
  mixins: [ random ],
  methods: {
    exportToXLSX(dataArray, name) {
      const title = name || this.generateFileName();

      try {
        const ws = XLSX.utils.json_to_sheet(dataArray);

        // Auto-adjust column widths based on the longest value in each column
        const colWidths = Object.keys(dataArray[0] || {}).map(key => {
          const maxLength = dataArray.reduce((max, row) => {
            const value = row[key] ? String(row[key]) : '';
            return Math.max(max, value.length);
          }, key.length); // Include header length
          return { wch: maxLength + 2 }; // Add padding
        });

        ws['!cols'] = colWidths;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, `${title}.xlsx`)
          .then(file => {
            // eslint-disable-next-line no-console
            console.log('Sheet Exported:', file);
            this.$oruga.notification.open({
              message: 'Sheet exported successfully...',
              variant: 'success',
              duration: 5000,
              position: 'bottom',
              queue: true,
              dangerouslyUseHTMLString: true,
            });
          });

      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error exporting to Excel:', error);
        this.$oruga.notification.open({
          message: 'Something went wrong...',
          variant: 'danger',
          duration: 3000,
          position: 'bottom',
          queue: true,
          dangerouslyUseHTMLString: true,
        });
      }
    },

    generateFileName() {
      const now = new Date();
      const datetime = now.toLocaleString().replace(/[\s:/,]/g, '_');
      return `Sheet_${datetime}`;
    },
  },
}