import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  InternalStaff,
  CustomerAccount,
  ProjectItem,
  ProjectStatus,
  ProjectMilestone,
  ProjectPhoto,
  ActivityLogItem,
} from '../types/backend';
import {
  INITIAL_STAFF_ACCOUNTS,
  INITIAL_CUSTOMERS,
  INITIAL_PROJECTS,
} from '../data/initialBackendData';

interface ProjectDataContextType {
  staffAccounts: InternalStaff[];
  customers: CustomerAccount[];
  projects: ProjectItem[];
  allPhotos: ProjectPhoto[];
  // Customer Operations
  addCustomer: (
    data: Omit<CustomerAccount, 'id' | 'registeredAt' | 'status'>
  ) => CustomerAccount;
  updateCustomer: (id: string, data: Partial<CustomerAccount>) => void;
  deleteCustomer: (id: string) => void;
  updateCustomerPassword: (customerId: string, newPassword: string) => boolean;
  // Project Operations
  addProject: (
    data: Omit<ProjectItem, 'id' | 'photos' | 'activityLogs' | 'milestones'>,
    customMilestones?: ProjectMilestone[]
  ) => ProjectItem;
  updateProject: (id: string, data: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  updateProjectProgress: (
    id: string,
    progress: number,
    status?: ProjectStatus,
    logNote?: string,
    actor?: string
  ) => void;
  addProjectMilestone: (
    projectId: string,
    milestone: Omit<ProjectMilestone, 'id'>
  ) => void;
  updateMilestoneStatus: (
    projectId: string,
    milestoneId: string,
    status: 'completed' | 'in-progress' | 'pending',
    notes?: string,
    actor?: string
  ) => void;
  // Photo Operations
  addProjectPhoto: (photo: Omit<ProjectPhoto, 'id' | 'uploadedAt'>) => void;
  deleteProjectPhoto: (photoId: string) => void;
  // Staff Operations
  updateStaff: (staffId: string, data: Partial<InternalStaff>) => void;
  updateStaffPassword: (staffId: string, newPassword: string) => void;
  // Schedule Operations
  updateProjectMilestones: (projectId: string, milestones: ProjectMilestone[]) => void;
  // Helpers
  generateRandomPassword: (companyNameOrPrefix?: string) => string;
  getProjectsByCustomer: (customerEmailOrId: string) => ProjectItem[];
  resetToDefaults: () => void;
}

const STORAGE_STAFF_KEY = 'pttid_staff_accounts_v2';
const STORAGE_CUSTOMERS_KEY = 'pttid_customers_data_v1';
const STORAGE_PROJECTS_KEY = 'pttid_projects_data_v2';

const ProjectDataContext = createContext<ProjectDataContextType | undefined>(undefined);

export const ProjectDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [staffAccounts, setStaffAccounts] = useState<InternalStaff[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_STAFF_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STAFF_ACCOUNTS;
    } catch {
      return INITIAL_STAFF_ACCOUNTS;
    }
  });

  const [customers, setCustomers] = useState<CustomerAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOMERS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROJECTS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_STAFF_KEY, JSON.stringify(staffAccounts));
    } catch (e) {
      console.error(e);
    }
  }, [staffAccounts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOMERS_KEY, JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  // Aggregate all photos across all projects
  const allPhotos: ProjectPhoto[] = projects.flatMap((p) => p.photos || []);

  const generateRandomPassword = (companyNameOrPrefix?: string): string => {
    const cleanPrefix = companyNameOrPrefix
      ? companyNameOrPrefix.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase() || 'CUST'
      : 'PTT';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    return `${cleanPrefix}#${randNum}!`;
  };

  const addCustomer = (
    data: Omit<CustomerAccount, 'id' | 'registeredAt' | 'status'>
  ): CustomerAccount => {
    const newCust: CustomerAccount = {
      ...data,
      id: `cust-${Date.now()}`,
      registeredAt: new Date().toISOString().split('T')[0],
      status: 'verified',
    };
    setCustomers((prev) => [newCust, ...prev]);
    return newCust;
  };

  const updateCustomer = (id: string, data: Partial<CustomerAccount>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCustomerPassword = (customerId: string, newPassword: string): boolean => {
    let updated = false;
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId || c.email.toLowerCase() === customerId.toLowerCase()) {
          updated = true;
          return { ...c, password: newPassword };
        }
        return c;
      })
    );
    return updated;
  };

  const addProject = (
    data: Omit<ProjectItem, 'id' | 'photos' | 'activityLogs' | 'milestones'>,
    customMilestones?: ProjectMilestone[]
  ): ProjectItem => {
    const defaultMilestones: ProjectMilestone[] = customMilestones || [
      {
        id: `m-init-1`,
        title: 'Kick-off Meeting & 3D CAD/CAM Design Approval',
        targetDate: data.startDate,
        status: 'in-progress',
      },
      {
        id: `m-init-2`,
        title: 'Precision Machining, Stamping & Sourcing Parts',
        targetDate: data.targetCompletionDate,
        status: 'pending',
      },
      {
        id: `m-init-3`,
        title: 'Mechanical Assembly & PLC Integration',
        targetDate: data.targetCompletionDate,
        status: 'pending',
      },
      {
        id: `m-init-4`,
        title: 'Quality Testing & Factory Acceptance Test (FAT)',
        targetDate: data.targetCompletionDate,
        status: 'pending',
      },
      {
        id: `m-init-5`,
        title: 'Delivery & Final Installation Commissioning',
        targetDate: data.targetCompletionDate,
        status: 'pending',
      },
    ];

    const initialLog: ActivityLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      actor: 'System / Admin',
      action: 'Project Created',
      detail: `Project baru dibuat dengan nomor PO: ${data.poNumber}`,
    };

    const newProject: ProjectItem = {
      ...data,
      id: `proj-${Date.now()}`,
      milestones: defaultMilestones,
      photos: [],
      activityLogs: [initialLog],
    };

    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, data: Partial<ProjectItem>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProjectProgress = (
    id: string,
    progress: number,
    status?: ProjectStatus,
    logNote?: string,
    actor: string = 'Staff Engineer'
  ) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        const updatedLogs = [...(p.activityLogs || [])];
        if (logNote) {
          updatedLogs.unshift({
            id: `log-${Date.now()}`,
            timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
            actor,
            action: `Progress ${progress}% (${status || p.status})`,
            detail: logNote,
          });
        }

        return {
          ...p,
          progressPercent: Math.max(0, Math.min(100, progress)),
          status: status || p.status,
          activityLogs: updatedLogs,
          actualCompletionDate: progress >= 100 ? new Date().toISOString().split('T')[0] : p.actualCompletionDate,
        };
      })
    );
  };

  const addProjectMilestone = (
    projectId: string,
    milestone: Omit<ProjectMilestone, 'id'>
  ) => {
    const newM: ProjectMilestone = {
      ...milestone,
      id: `m-${Date.now()}`,
    };
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, milestones: [...(p.milestones || []), newM] } : p))
    );
  };

  const updateMilestoneStatus = (
    projectId: string,
    milestoneId: string,
    status: 'completed' | 'in-progress' | 'pending',
    notes?: string,
    actor?: string
  ) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        let milestoneTitle = '';
        let milestoneDept = '';

        const updatedM = (p.milestones || []).map((m) => {
          if (m.id === milestoneId) {
            milestoneTitle = m.title;
            milestoneDept = m.department || '';
            return {
              ...m,
              status,
              notes: notes !== undefined ? notes : m.notes,
              completedDate:
                status === 'completed'
                  ? new Date().toISOString().split('T')[0]
                  : status === 'in-progress'
                  ? undefined
                  : m.completedDate,
            };
          }
          return m;
        });

        // Calculate progress percentage based on completed milestones
        const totalM = updatedM.length;
        const completedM = updatedM.filter((m) => m.status === 'completed').length;
        const newProgress = totalM > 0 ? Math.round((completedM / totalM) * 100) : p.progressPercent;
        const isNowCompleted = newProgress >= 100;

        // Activity log entry
        const updatedLogs = [...(p.activityLogs || [])];
        const displayActor = actor || (milestoneDept ? `Departemen ${milestoneDept}` : 'Staff Engineer');
        updatedLogs.unshift({
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
          actor: displayActor,
          action: `Milestone: ${status === 'completed' ? 'Selesai' : status === 'in-progress' ? 'Dikerjakan' : 'Pending'}`,
          detail: `Tahapan "${milestoneTitle}" diperbarui ke status ${status}. ${notes ? `Catatan: ${notes}` : ''}`,
        });

        // Fallback invoice and delivery if completed
        const defaultInvoice = p.invoice || {
          invoiceNumber: `INV/PTT/${new Date().getFullYear()}/${p.poNumber.replace(/[^0-9]/g, '').slice(-4) || '1020'}`,
          invoiceDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          totalAmount: p.contractValue,
          downPaymentPercent: 50,
          downPaymentAmount: Math.round(p.contractValue * 0.5),
          finalPaymentAmount: Math.round(p.contractValue * 0.5),
          status: 'Paid Full',
          bankName: 'Bank Central Asia (BCA)',
          bankAccount: '542-089-7700',
          accountHolder: 'PT. PRIMA TEKNIK TRADA',
          paidAt: new Date().toISOString().split('T')[0],
        };

        const defaultDelivery = p.delivery || {
          doNumber: `DO/PTT-LOG/${new Date().getFullYear()}/${p.poNumber.replace(/[^0-9]/g, '').slice(-4) || '088'}`,
          deliveryDate: `${new Date().toISOString().split('T')[0]} 10:00 WIB`,
          expedition: 'Truk Towing & Dedicated Flatbed PTT Logistics (Armada Internal)',
          vehicleNumber: 'B 9821 PTT',
          driverName: 'Sutrisno (PTT Logistics Lead)',
          driverPhone: '+62 813-8890-1122',
          deliveryAddress: p.customerName,
          status: 'Installed & BAST Signed',
          bastNumber: `BAST/${p.poNumber.replace(/[^0-9]/g, '').slice(-4) || '099'}/PTT`,
          receivedBy: `${p.customerName} Representative`,
          receivedDate: new Date().toISOString().split('T')[0],
        };

        return {
          ...p,
          milestones: updatedM,
          progressPercent: newProgress,
          status: isNowCompleted ? 'Completed' : (newProgress > 0 && p.status === 'Completed' ? 'Completed' : p.status),
          actualCompletionDate: isNowCompleted ? (p.actualCompletionDate || new Date().toISOString().split('T')[0]) : p.actualCompletionDate,
          activityLogs: updatedLogs,
          invoice: isNowCompleted ? (p.invoice || defaultInvoice) : p.invoice,
          delivery: isNowCompleted ? (p.delivery || defaultDelivery) : p.delivery,
        };
      })
    );
  };

  const addProjectPhoto = (photo: Omit<ProjectPhoto, 'id' | 'uploadedAt'>) => {
    const newPhoto: ProjectPhoto = {
      ...photo,
      id: `ph-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      inspectionPassed: true,
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === photo.projectId) {
          return {
            ...p,
            photos: [newPhoto, ...(p.photos || [])],
            activityLogs: [
              {
                id: `log-${Date.now()}`,
                timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
                actor: photo.uploadedBy,
                action: 'Foto Project Baru Diunggah',
                detail: `Foto "${photo.title}" ditambahkan ke dokumentasi project.`,
              },
              ...(p.activityLogs || []),
            ],
          };
        }
        return p;
      })
    );
  };

  const deleteProjectPhoto = (photoId: string) => {
    setProjects((prev) =>
      prev.map((p) => ({
        ...p,
        photos: (p.photos || []).filter((ph) => ph.id !== photoId),
      }))
    );
  };

  const updateStaff = (staffId: string, data: Partial<InternalStaff>) => {
    setStaffAccounts((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, ...data } : s))
    );
  };

  const updateStaffPassword = (staffId: string, newPassword: string) => {
    setStaffAccounts((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, password: newPassword } : s))
    );
  };

  const updateProjectMilestones = (projectId: string, milestones: ProjectMilestone[]) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          milestones,
          activityLogs: [
            {
              id: `log-${Date.now()}`,
              timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
              actor: 'Administrator',
              action: 'Milestone Disunting',
              detail: `Urutan dan tahapan milestone pengerjaan project diperbarui oleh Administrator.`,
            },
            ...(p.activityLogs || []),
          ],
        };
      })
    );
  };

  const getProjectsByCustomer = (customerEmailOrId: string): ProjectItem[] => {
    const cleanQuery = customerEmailOrId.toLowerCase().trim();
    return projects.filter(
      (p) =>
        p.customerId.toLowerCase() === cleanQuery ||
        p.customerEmail.toLowerCase() === cleanQuery ||
        p.customerName.toLowerCase().includes(cleanQuery)
    );
  };

  const resetToDefaults = () => {
    setStaffAccounts(INITIAL_STAFF_ACCOUNTS);
    setCustomers(INITIAL_CUSTOMERS);
    setProjects(INITIAL_PROJECTS);
    localStorage.removeItem(STORAGE_STAFF_KEY);
    localStorage.removeItem(STORAGE_CUSTOMERS_KEY);
    localStorage.removeItem(STORAGE_PROJECTS_KEY);
  };

  return (
    <ProjectDataContext.Provider
      value={{
        staffAccounts,
        customers,
        projects,
        allPhotos,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        updateCustomerPassword,
        addProject,
        updateProject,
        deleteProject,
        updateProjectProgress,
        addProjectMilestone,
        updateMilestoneStatus,
        updateProjectMilestones,
        addProjectPhoto,
        deleteProjectPhoto,
        updateStaff,
        updateStaffPassword,
        generateRandomPassword,
        getProjectsByCustomer,
        resetToDefaults,
      }}
    >
      {children}
    </ProjectDataContext.Provider>
  );
};

export const useProjectData = () => {
  const context = useContext(ProjectDataContext);
  if (!context) {
    throw new Error('useProjectData must be used within a ProjectDataProvider');
  }
  return context;
};
