import webview, os, sys

def on_closed():
  pass

def on_closing():
  pass

def on_shown():
  pass

def on_loaded():
  pass

class Api:
  def openChild(self, url):
    window.hide()
    child = webview.create_window(url, url)

  def minimize(self):
    window.minimize()

  def fullscreen(self):
    window.toggle_fullscreen()

  def close(self):
    window.destroy()
    os._exit(0)

  def reload(self):
    os.startfile(sys.argv[0])
    self.close()

  def getSaves(self):
    saves = os.listdir("saves")
    return {'message': str(saves)}

  def deleteSave(self, name):
    os.remove("".join(["saves/", name, ".json"]))

  def getSave(self, name):
    with open("".join(['saves/', name, ".json"]),'r') as save:
      content = save.read()
      return {'message': str(content)}

  def export(self, name, json):
    if not os.path.exists("saves"):
      os.mkdir("saves")
    with open("".join(["saves/", name, ".json"]), "w") as export:
      export.write(str(json))

#!FLAG-HTML

if __name__ == '__main__':
  api = Api()
  window = webview.create_window("{settings.app_name}", html=html, js_api=api, width={settings.app_proportions[0]}, height={settings.app_proportions[1]}, confirm_close={settings.app_confirm_close}, frameless={settings.app_frameless}, fullscreen={settings.app_fullscreen})
  window.closed += on_closed
  window.closing += on_closing
  window.shown += on_shown
  window.loaded += on_loaded
  webview.start(gui="{settings.app_web_engine}", debug={settings.app_allow_inspect})