import { expect } from 'chai';
import sinon from 'sinon';
import { adminLogin, getAllKoordinator, addKoordinator, updateKoordinator, deleteKoordinator, resetKoordinatorPassword, getActivityLogs } from '../controllers/adminController.js';

describe('AdminController Tests', () => {

  // Mock objects
  const mockDb = {
    Admin: {},
    Koordinator: {},
    ActivityLog: {}
  };
  
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: { id: 1 }
    };
    res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
      json: sinon.spy()
    };
  });

  describe('adminLogin', () => {
    it('should return 400 for invalid credentials', async () => {
      req.body = {
        username: 'admin',
        password: 'wrongpassword'
      };
      mockDb.Admin.findOne = sinon.stub().returns(null);
      
      await adminLogin(req, res);
      
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.status().json.calledWith({
        message: 'Invalid credentials'
      })).to.be.true;
    });

    it('should return token for valid credentials', async () => {
      const mockAdmin = {
        id: 1,
        username: 'admin',
        password: await bcrypt.hash('correctpassword', 10)
      };
      
      req.body = {
        username: 'admin',
        password: 'correctpassword'
      };
      
      mockDb.Admin.findOne = sinon.stub().returns(mockAdmin);
      
      await adminLogin(req, res);
      
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('token');
    });
  });

  describe('getAllKoordinator', () => {
    it('should return all koordinators', async () => {
      const mockKoordinators = [
        { id: 1, nama: 'Koordinator 1' },
        { id: 2, nama: 'Koordinator 2' }
      ];
      
      mockDb.Koordinator.findAll = sinon.stub().returns(mockKoordinators);
      
      await getAllKoordinator(req, res);
      
      expect(res.json.calledWith(mockKoordinators)).to.be.true;
    });
  });

  describe('addKoordinator', () => {
    it('should create new koordinator and activity log', async () => {
      req.body = {
        nama: 'New Koordinator',
        email: 'new@test.com',
        password: 'password123'
      };
      
      const mockNewKoordinator = {
        id: 1,
        ...req.body
      };
      
      mockDb.Koordinator.create = sinon.stub().returns(mockNewKoordinator);
      mockDb.ActivityLog.create = sinon.stub().resolves();
      
      await addKoordinator(req, res);
      
      expect(res.status.calledWith(201)).to.be.true;
      expect(mockDb.ActivityLog.create.called).to.be.true;
    });
  });

  describe('updateKoordinator', () => {
    it('should return 404 if koordinator not found', async () => {
      req.params = { id: 999 };
      mockDb.Koordinator.findByPk = sinon.stub().returns(null);
      
      await updateKoordinator(req, res);
      
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('should update koordinator and create activity log', async () => {
      const mockKoordinator = {
        id: 1,
        email: 'test@test.com',
        update: sinon.stub().resolves()
      };
      
      req.params = { id: 1 };
      req.body = { nama: 'Updated Name' };
      
      mockDb.Koordinator.findByPk = sinon.stub().returns(mockKoordinator);
      mockDb.ActivityLog.create = sinon.stub().resolves();
      
      await updateKoordinator(req, res);
      
      expect(mockKoordinator.update.called).to.be.true;
      expect(mockDb.ActivityLog.create.called).to.be.true;
    });
  });

  describe('deleteKoordinator', () => {
    it('should delete koordinator and create activity log', async () => {
      const mockKoordinator = {
        id: 1,
        email: 'test@test.com',
        destroy: sinon.stub().resolves()
      };
      
      req.params = { id: 1 };
      
      mockDb.Koordinator.findByPk = sinon.stub().returns(mockKoordinator);
      mockDb.ActivityLog.create = sinon.stub().resolves();
      
      await deleteKoordinator(req, res);
      
      expect(mockKoordinator.destroy.called).to.be.true;
      expect(mockDb.ActivityLog.create.called).to.be.true;
    });
  });

  describe('resetKoordinatorPassword', () => {
    it('should reset password and create activity log', async () => {
      const mockKoordinator = {
        id: 1,
        email: 'test@test.com',
        update: sinon.stub().resolves()
      };
      
      req.params = { id: 1 };
      req.body = { newPassword: 'newpassword123' };
      
      mockDb.Koordinator.findByPk = sinon.stub().returns(mockKoordinator);
      mockDb.ActivityLog.create = sinon.stub().resolves();
      
      await resetKoordinatorPassword(req, res);
      
      expect(mockKoordinator.update.called).to.be.true;
      expect(mockDb.ActivityLog.create.called).to.be.true;
    });
  });

  describe('getActivityLogs', () => {
    it('should return activity logs with associations', async () => {
      const mockLogs = [
        { id: 1, action: 'Test action', timestamp: new Date() }
      ];
      
      mockDb.ActivityLog.findAll = sinon.stub().returns(mockLogs);
      
      await getActivityLogs(req, res);
      
      expect(res.json.calledWith(mockLogs)).to.be.true;
    });
  });
});