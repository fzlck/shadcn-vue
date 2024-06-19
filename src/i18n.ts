import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false, // Specify 'legacy: false' for Vue I18n version 9
  locale: 'de', // Set the default locale here
  fallbackLocale: 'de', // Set the fallback locale here
  messages: {
    en: {
      preferences_icon: '⚙️',
      logout: 'Logout',
      profil_edit: 'Edit profil',
      login_name: 'Login name | Login names',
      pre_name: 'Prename | Prenames',
      name: 'Name | Names',
      profil: 'Profil | Profile',
      date_locale: 'en-US',
      pick_a_date: 'Pick a date',
      yyyy: 'YYYY',
      order: 'Order | Orders',
      overview: 'Overview',
      new_order: 'New Order',
      order_details: 'Order - Details',
      // column headers: columns.ts
      type: 'Type',
      com_no: 'Com. No.',
      commission_no: 'Commission Number',
      status: 'Status',
      order_date: 'Order Date',
      dealer: 'Dealer',
      last_status: 'Last Status',
      address: 'Address',
      customer: 'Customer',
      salesman: 'Salesman',
      date_of_installation: 'Date of Installation',
      planned_delivery_week: 'Planned Delivery Week',
      // select placeholders: columns.ts
      select_status: 'Select status',
      select_dealer: 'Select dealer',
      // DataTableFacetedFilter
      selected: 'selected',
      no_results_found: 'No results found',
      clear_filters: 'Clear filters',
      // DataTable
      no_results: 'No results.',
      // DataTablePagination
      of: 'von',
      rows_selected: 'row(s) selected.',
      rows_per_page: 'Rows per page',
      page: 'Page',
      // OrderDetailsForm
      baseline_data: 'Baseline Data',
      product: 'Product',
      select_product: 'Select product',
      order_type: 'Order Type',
      select_order_type: 'Select order type',
      order_form: 'Order Form',
      order_number: 'Order Number',
      photo_survey: 'Photo Survey',
      delivery_address: 'Delivery Address',
      pls_always_send: 'Please always send with your surveys the form "Control Dimensions" too',
      lift_options: 'Lift Options',
      side_of_installation: 'Side of Installation',
      select_side_of_installation: 'Select side of installation',
      key_switch: 'Key Switch',
      select_key_switch: 'Select key switch',
      rail_fixing: 'Rail Fixing',
      select_rail_fixing: 'Select rail fixing',
      remark: 'Remark',
      dimensions: 'Dimensions/Pictures',
      draft: 'Draft',
      orders_drawings: 'Orders/Drawings',
      drawing_internal: 'Drawing Internal',
      delivery_note: 'Delivery Note',
      save_order: 'Save Order',
      cancel_order: 'Cancel Order',
      history: 'History',
      print: 'Print',
      close: 'Close',
      // placeholders
      name_of_salesman: 'Name of Salesman',
      name_of_customer: 'Name of Customer',
      // dropzone
      drop_your_files_here: 'Drop your files here',
      select_files: 'Select files',
      files_5mb: 'Files must be under 5MB',
      // menu
      requests: 'Requests',
      settings: 'Settings',
      system_settings: 'System Settings',
      // historyColumns.ts
      order_no: 'Order No.',
      comment: 'Comment',
      sent_to: 'Sent to',
      document_type: 'Document type',
      file_name: 'File name',
      created_by: 'Created by',
      date_created: 'Date created',
      changed_by: 'Changed by',
      date_modified: 'Date modified',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      delete: 'Delete',
      loading_details: 'Loading Details...'
    },
    de: {
      preferences_icon: '⚙️',
      logout: 'Logout',
      profil_edit: 'Profil bearbeiten',
      login_name: 'Benutzername | Benutzernamen',
      pre_name: 'Vorname | Vornamen',
      name: 'Name | Namen',
      profil: 'Profil | Profile',
      date_locale: 'de-DE',
      pick_a_date: 'Datum auswählen',
      yyyy: 'JJJJ',
      order: 'Auftrag | Aufträge',
      overview: 'Übersicht',
      new_order: 'Neuer Auftrag',
      order_details: 'Auftragsdetails',
      // column headers: columns.ts
      type: 'Typ',
      com_no: 'Komm. Nr.',
      commission_no: 'Kommissionsnummer',
      status: 'Status',
      order_date: 'Auftragsdatum',
      dealer: 'Händler',
      last_status: 'Letzter Status',
      address: 'Adresse',
      customer: 'Kunde',
      salesman: 'Verkäufer',
      date_of_installation: 'Installationsdatum',
      planned_delivery_week: 'Geplante Lieferwoche',
      // select placeholders: columns.ts
      select_status: 'Status auswählen',
      select_dealer: 'Händler auswählen',
      // DataTableFacetedFilter
      selected: 'ausgewählt',
      no_results_found: 'Keine Ergebnisse gefunden.',
      clear_filters: 'Filter zurücksetzen',
      // Data table
      no_results: 'Keine Ergebnisse.',
      // DataTablePagination
      of: 'von',
      rows_selected: 'Zeile(n) ausgewählt.',
      rows_per_page: 'Zeilen pro Seite',
      page: 'Seite',
      // OrderDetailsForm
      baseline_data: 'Grundlagendaten',
      product: 'Produkt',
      select_product: 'Produkt auswählen',
      order_type: 'Auftragsart',
      select_order_type: 'Auftragsart auswählen',
      order_form: 'Auftragsformular',
      order_number: 'Auftragsnummer',
      photo_survey: 'Fotobefragung',
      delivery_address: 'Lieferadresse',
      pls_always_send: 'Bitte senden Sie immer zusammen mit Ihren Umfragen auch das Formular "Maßkontrolle"',
      lift_options: 'Aufzugsoptionen',
      side_of_installation: 'Installationsseite',
      select_side_of_installation: 'Installationsseite auswählen',
      key_switch: 'Schlüsselschalter',
      select_key_switch: 'Schlüsselschalter auswählen',
      rail_fixing: 'Schienenbefestigung',
      select_rail_fixing: 'Schienenbefestigung auswählen',
      remark: 'Bemerkung',
      dimensions: 'Abmessungen',
      draft: 'Entwurf',
      orders_drawings: 'Zeichnungen',
      drawing_internal: 'Interne Zeichnung',
      delivery_note: 'Lieferschein',
      save_order: 'Auftrag speichern',
      cancel_order: 'Auftrag  stornieren',
      history: 'Verlauf',
      print: 'Drucken',
      close: 'Schließen',
      // placeholders
      name_of_salesman: 'Name des Verkäufers',
      name_of_customer: 'Name des Kunden',
      // dropzone
      drop_your_files_here: 'Dateien hier ablegen',
      select_files: 'Dateien auswählen',
      files_5mb: 'Dateien müssen unter 5MB sein',
      // menu
      requests: 'Anfragen',
      settings: 'Einstellungen',
      system_settings: 'System Einstellungen',
      // historyColumns.ts
      order_no: 'Bestellnummer',
      comment: 'Kommentar',
      sent_to: 'Gesendet an',
      document_type: 'Dokumenttyp',
      file_name: 'Dateiname',
      created_by: 'Erstellt von',
      date_created: 'Erstellungsdatum',
      changed_by: 'Geändert durch',
      date_modified: 'Änderungsdatum',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Zurück',
      delete: 'Löschen',
      loading_details: 'Details werden geladen...'
    },
  },
});

export default i18n;