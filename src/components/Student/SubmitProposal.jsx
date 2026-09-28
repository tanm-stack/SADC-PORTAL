import React, { useState } from 'react';
import { FilePlus, Plus, Trash2, UploadCloud, CheckCircle2, AlertCircle, ArrowLeft, Shield, DollarSign, Calendar, MapPin, Users } from 'lucide-react';

export default function SubmitProposal({ onSubmitSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic & Technical',
    organizer: 'Coding & Robotics Society',
    department: 'Computer Science & Engineering',
    proposedDate: '',
    proposedTime: '09:30 AM - 04:30 PM',
    venue: 'Seminar Hall 1, Academic Block B',
    expectedParticipants: '100',
    facultyAdvisor: 'Dr. Meera Nambiar',
    summary: '',
  });

  const [budgetItems, setBudgetItems] = useState([
    { item: 'Speaker Honorarium & Travel Allowance', amount: 15000, notes: '2 Subject Matter Experts' },
    { item: 'Workshop Equipment & Consumables Rental', amount: 20000, notes: 'Hardware kits & tools' },
    { item: 'Participant Refreshments & Tea', amount: 8000, notes: 'Morning tea & lunch box for 100 pax' }
  ]);

  const [attachedFile, setAttachedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Dynamic budget calculation
  const totalBudget = budgetItems.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);

  const addBudgetRow = () => {
    setBudgetItems([...budgetItems, { item: '', amount: 0, notes: '' }]);
  };

  const removeBudgetRow = (index) => {
    if (budgetItems.length === 1) return;
    setBudgetItems(budgetItems.filter((_, i) => i !== index));
  };

  const handleBudgetItemChange = (index, field, value) => {
    const updated = [...budgetItems];
    updated[index][field] = field === 'amount' ? (value === '' ? '' : Number(value)) : value;
    setBudgetItems(updated);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Event title is required.';
    if (!formData.proposedDate) newErrors.proposedDate = 'Event date is required.';
    if (!formData.venue.trim()) newErrors.venue = 'Event venue is required.';
    if (!formData.facultyAdvisor.trim()) newErrors.facultyAdvisor = 'Faculty Advisor name is required.';
    if (!formData.summary.trim() || formData.summary.trim().length < 30) {
      newErrors.summary = 'Executive summary must be at least 30 characters long.';
    }
    if (budgetItems.some(b => !b.item.trim() || !b.amount || Number(b.amount) <= 0)) {
      newErrors.budget = 'All budget items must have a description and valid amount greater than zero.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const newProposal = {
      id: `PROP-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      category: formData.category,
      organizer: formData.organizer,
      applicantName: 'Aarav Sharma',
      applicantRollNo: '2024-CS-042',
      applicantEmail: 'aarav.sharma@institution.edu',
      department: formData.department,
      proposedDate: formData.proposedDate,
      proposedTime: formData.proposedTime,
      venue: formData.venue,
      expectedParticipants: Number(formData.expectedParticipants),
      facultyAdvisor: formData.facultyAdvisor,
      summary: formData.summary,
      budgetTotal: totalBudget,
      budgetBreakdown: budgetItems,
      status: 'Pending',
      submittedAt: new Date().toISOString(),
      adminRemarks: '',
      attachmentName: attachedFile ? attachedFile.name : 'Event_Proposal_Detailed_Budget.pdf'
    };

    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess(newProposal);
    }, 1200);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-sadc-border p-12 text-center rounded-sm shadow-subtle max-w-2xl mx-auto space-y-4 my-8">
        <div className="w-16 h-16 rounded-full bg-sadc-gold-light text-sadc-navy flex items-center justify-center mx-auto border border-sadc-gold">
          <CheckCircle2 className="w-8 h-8 text-sadc-gold" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-sadc-navy">
          Proposal Submitted Successfully!
        </h2>
        <p className="text-xs text-sadc-muted leading-relaxed">
          Your proposal has been logged under reference code. It has been routed to the <strong>SADC Dean Office</strong> for administrative review and financial grant evaluation.
        </p>
        <p className="text-xs font-mono text-sadc-navy bg-sadc-bg p-2 rounded-sm border border-sadc-border inline-block">
          STATUS: PENDING ADMINISTRATIVE REVIEW
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      
      {/* Form Top Banner */}
      <div className="bg-white border border-sadc-border p-6 rounded-sm shadow-token flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="text-sadc-muted hover:text-sadc-navy text-xs font-mono flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span className="text-sadc-muted text-xs font-mono">/</span>
            <span className="text-xs font-mono text-sadc-gold uppercase">Form Ref #PR-2026</span>
          </div>
          <h2 className="font-serif text-xl font-bold text-sadc-navy mt-1">
            Official Event Proposal & Funding Application
          </h2>
          <p className="text-xs text-sadc-muted">
            All fields marked with (<span className="text-red-600">*</span>) are mandatory per SADC Administrative Code 2026.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 border border-sadc-border text-sadc-muted hover:text-sadc-navy text-xs font-semibold rounded-sm bg-sadc-bg"
        >
          Cancel Draft
        </button>
      </div>

      {/* Error Summary Banner */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-xs text-red-800 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>Please correct the errors in the proposal form before submitting:</span>
          </div>
          <ul className="list-disc list-inside pl-5 space-y-0.5">
            {Object.values(errors).map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SECTION 1: EVENT GENERAL INFORMATION */}
      <div className="bg-white border border-sadc-border p-6 rounded-sm shadow-token space-y-4">
        <h3 className="font-serif text-sm font-bold text-sadc-navy uppercase tracking-wider border-b border-sadc-border pb-2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-sadc-gold" />
          <span>1. Event Core Specification</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Event Proposal Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. National Robotics Symposium & Hardware Hackathon 2026"
              className={`w-full px-3 py-2 text-xs bg-white border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy ${
                errors.title ? 'border-red-500 bg-red-50' : 'border-sadc-border'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Activity Category <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy"
            >
              <option value="Academic & Technical">Academic & Technical Workshop</option>
              <option value="Inter-College Competition">Inter-College Competition / Fest</option>
              <option value="Cultural & Performing Arts">Cultural & Performing Arts</option>
              <option value="Community & Environment">Community & Environment Outreach</option>
              <option value="Sports & Athletics">Sports & Athletics Championship</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Organizing Society / Student Body <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.organizer}
              onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Host Academic Department <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Faculty Advisor Name & Department <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.facultyAdvisor}
              onChange={(e) => setFormData({ ...formData, facultyAdvisor: e.target.value })}
              placeholder="e.g. Dr. Meera Nambiar (Dept of ECE)"
              className="w-full px-3 py-2 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy"
            />
          </div>

        </div>
      </div>

      {/* SECTION 2: SCHEDULE, VENUE & CAPACITY */}
      <div className="bg-white border border-sadc-border p-6 rounded-sm shadow-token space-y-4">
        <h3 className="font-serif text-sm font-bold text-sadc-navy uppercase tracking-wider border-b border-sadc-border pb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sadc-gold" />
          <span>2. Schedule & Logistics Details</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Proposed Event Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.proposedDate}
              onChange={(e) => setFormData({ ...formData, proposedDate: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Time Slot <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.proposedTime}
              onChange={(e) => setFormData({ ...formData, proposedTime: e.target.value })}
              placeholder="09:00 AM - 05:00 PM"
              className="w-full px-3 py-2 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Requested Campus Venue <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              placeholder="e.g. Main Auditorium / Lab B"
              className="w-full px-3 py-2 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Expected Participant Count <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              required
              value={formData.expectedParticipants}
              onChange={(e) => setFormData({ ...formData, expectedParticipants: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy font-mono"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Executive Event Summary & Objectives <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Provide a concise background summary, learning objectives, and schedule breakdown..."
              className={`w-full p-3 text-xs bg-white border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy ${
                errors.summary ? 'border-red-500 bg-red-50' : 'border-sadc-border'
              }`}
            />
          </div>

        </div>
      </div>

      {/* SECTION 3: DYNAMIC FINANCIAL BUDGET CALCULATOR */}
      <div className="bg-white border border-sadc-border p-6 rounded-sm shadow-token space-y-4">
        <div className="flex items-center justify-between border-b border-sadc-border pb-2">
          <h3 className="font-serif text-sm font-bold text-sadc-navy uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-sadc-gold" />
            <span>3. Itemized Financial Budget Calculator</span>
          </h3>
          <button
            type="button"
            onClick={addBudgetRow}
            className="px-3 py-1 bg-sadc-navy text-white hover:bg-sadc-navy-hover text-xs font-semibold rounded-sm flex items-center gap-1 shadow-token"
          >
            <Plus className="w-3.5 h-3.5 text-sadc-gold" />
            <span>Add Expense Line</span>
          </button>
        </div>

        {errors.budget && (
          <p className="text-xs text-red-600 font-semibold">{errors.budget}</p>
        )}

        <div className="overflow-x-auto border border-sadc-border rounded-sm">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-sadc-navy text-white font-mono text-[11px]">
                <th className="p-2.5">Expenditure Description</th>
                <th className="p-2.5 w-36">Amount (₹)</th>
                <th className="p-2.5">Justification / Specifications</th>
                <th className="p-2.5 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sadc-border">
              {budgetItems.map((b, idx) => (
                <tr key={idx} className="hover:bg-sadc-bg">
                  <td className="p-2">
                    <input
                      type="text"
                      required
                      value={b.item}
                      onChange={(e) => handleBudgetItemChange(idx, 'item', e.target.value)}
                      placeholder="e.g. Stage rental / Speaker TA"
                      className="w-full px-2 py-1 bg-white border border-sadc-border rounded-sm text-xs focus:outline-none focus:border-sadc-navy"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      required
                      min="1"
                      value={b.amount}
                      onChange={(e) => handleBudgetItemChange(idx, 'amount', e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-sadc-border rounded-sm text-xs font-mono font-bold text-sadc-navy focus:outline-none focus:border-sadc-navy"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={b.notes}
                      onChange={(e) => handleBudgetItemChange(idx, 'notes', e.target.value)}
                      placeholder="Vendor details or quantity specs"
                      className="w-full px-2 py-1 bg-white border border-sadc-border rounded-sm text-xs focus:outline-none focus:border-sadc-navy"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeBudgetRow(idx)}
                      disabled={budgetItems.length === 1}
                      className="text-stone-400 hover:text-red-600 disabled:opacity-30 p-1"
                      title="Remove row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-sadc-gold-light/30 font-bold border-t-2 border-sadc-navy">
                <td className="p-3 text-right font-mono uppercase text-sadc-navy">
                  Total Grant Requested:
                </td>
                <td className="p-3 font-mono text-base text-sadc-navy">
                  ₹{totalBudget.toLocaleString('en-IN')}
                </td>
                <td colSpan="2" className="p-3 text-[11px] font-mono text-sadc-muted italic">
                  *Auto-calculated from budget breakdown
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: FILE ATTACHMENT MOCK */}
      <div className="bg-white border border-sadc-border p-6 rounded-sm shadow-token space-y-3">
        <h3 className="font-serif text-sm font-bold text-sadc-navy uppercase tracking-wider border-b border-sadc-border pb-2 flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-sadc-gold" />
          <span>4. Official Attachments & Budget Verification Sheet</span>
        </h3>

        <div className="border-2 border-dashed border-sadc-border bg-sadc-bg p-6 text-center rounded-sm hover:border-sadc-navy transition-colors">
          <UploadCloud className="w-8 h-8 text-sadc-navy mx-auto mb-2" />
          <p className="text-xs font-semibold text-sadc-navy">
            {attachedFile ? attachedFile.name : 'Upload Detailed Event Proposal PDF or Budget Spreadsheet'}
          </p>
          <p className="text-[11px] text-sadc-muted mt-0.5">
            Accepted formats: .PDF, .DOCX, .XLSX (Max size: 10 MB)
          </p>
          <label className="mt-3 inline-block bg-white border border-sadc-border hover:border-sadc-navy text-sadc-navy px-4 py-1.5 text-xs font-semibold rounded-sm cursor-pointer shadow-token">
            Browse File
            <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.docx,.xlsx" />
          </label>
        </div>
      </div>

      {/* FORM SUBMISSION ACTIONS */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-sadc-border">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-xs font-semibold text-sadc-muted hover:text-sadc-navy border border-sadc-border rounded-sm bg-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-sadc-navy hover:bg-sadc-navy-hover text-white text-xs font-semibold uppercase tracking-wider rounded-sm border border-sadc-navy shadow-token flex items-center gap-2"
        >
          <FilePlus className="w-4 h-4 text-sadc-gold" />
          <span>Submit Formal Proposal to SADC</span>
        </button>
      </div>

    </form>
  );
}
